'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Save, Trash2, Image as ImageIcon } from 'lucide-react';
import NFTGallery from './NFTGallery';
import Jazzicon from './Jazzicon';
import type { NFTItem, UserProfile, ENSData } from '@/types/identity';

interface ProfileEditorProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (profile: UserProfile) => void;
}

export default function ProfileEditor({
  address,
  isOpen,
  onClose,
  onSave,
}: ProfileEditorProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [ensData, setEnsData] = useState<ENSData | null>(null);
  const [selectedNft, setSelectedNft] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'nft' | 'preview'>('nft');

  // Fetch current profile and ENS data
  useEffect(() => {
    if (!isOpen) return;

    async function fetchData() {
      setLoading(true);
      try {
        const [profileRes, ensRes] = await Promise.all([
          fetch(`/api/profile/${address}`).then(r => r.json()),
          fetch(`/api/ens/${address}`).then(r => r.json()),
        ]);

        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
          // If there's an existing profile with NFT, pre-select it
          if (profileRes.data.selectedNftId) {
            setSelectedNft({
              tokenId: profileRes.data.selectedNftId.split(':')[1] || '',
              contractAddress: profileRes.data.selectedNftId.split(':')[0] || '',
              name: profileRes.data.selectedNftName,
              description: null,
              image: profileRes.data.selectedNftImage,
              thumbnailUrl: profileRes.data.selectedNftImage,
              collectionName: profileRes.data.selectedNftCollection,
              tokenType: 'ERC721',
            });
          }
        }

        if (ensRes.success) {
          setEnsData(ensRes.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [address, isOpen]);

  const handleNftSelect = (nft: NFTItem) => {
    setSelectedNft(nft);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newProfile: UserProfile = {
        selectedNftId: selectedNft 
          ? `${selectedNft.contractAddress}:${selectedNft.tokenId}` 
          : null,
        selectedNftImage: selectedNft?.image || null,
        selectedNftName: selectedNft?.name || null,
        selectedNftCollection: selectedNft?.collectionName || null,
        updatedAt: Date.now(),
      };

      const response = await fetch(`/api/profile/${address}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile),
      });

      const data = await response.json();
      
      if (data.success) {
        setProfile(newProfile);
        onSave?.(newProfile);
        onClose();
      } else {
        console.error('Failed to save profile:', data.error);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/profile/${address}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setProfile(null);
        setSelectedNft(null);
        onSave?.({
          selectedNftId: null,
          selectedNftImage: null,
          selectedNftName: null,
          selectedNftCollection: null,
          updatedAt: Date.now(),
        });
      }
    } catch (error) {
      console.error('Error resetting profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const currentAvatar = selectedNft?.image || ensData?.avatar || null;
  const selectedNftId = selectedNft 
    ? `${selectedNft.contractAddress}:${selectedNft.tokenId}` 
    : null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Edit Profile Picture</h2>
            <p className="text-sm text-gray-500">
              Select an NFT to use as your profile picture
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('nft')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'nft'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ImageIcon size={16} className="inline mr-2" />
                Select NFT
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Preview
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'nft' ? (
                <NFTGallery
                  address={address}
                  selectedNftId={selectedNftId}
                  onSelect={handleNftSelect}
                  maxDisplay={30}
                />
              ) : (
                <div className="flex flex-col items-center py-8">
                  {/* Preview Avatar */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      {currentAvatar ? (
                        <img
                          src={currentAvatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Jazzicon address={address} size={128} />
                      )}
                    </div>
                    {selectedNft && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                        NFT Selected
                      </div>
                    )}
                  </div>

                  {/* Preview Info */}
                  <div className="text-center">
                    {ensData?.ensName ? (
                      <h3 className="text-xl font-bold text-gray-800">
                        {ensData.ensName}
                      </h3>
                    ) : (
                      <h3 className="text-lg font-mono text-gray-600">
                        {address.slice(0, 8)}...{address.slice(-6)}
                      </h3>
                    )}

                    {selectedNft && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Selected NFT:</p>
                        <p className="font-medium text-gray-800">{selectedNft.name}</p>
                        {selectedNft.collectionName && (
                          <p className="text-xs text-gray-500">{selectedNft.collectionName}</p>
                        )}
                      </div>
                    )}

                    {ensData?.avatar && !selectedNft && (
                      <p className="text-sm text-gray-500 mt-4">
                        Using ENS avatar
                      </p>
                    )}

                    {!currentAvatar && (
                      <p className="text-sm text-gray-500 mt-4">
                        Using generated Jazzicon
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleReset}
                disabled={saving || (!profile?.selectedNftId && !selectedNft)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={16} />
                Reset to Default
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

