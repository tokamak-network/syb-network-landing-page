'use client';

import { useMemo, useState } from 'react';
import BlogCard from './BlogCard';
import type { BlogPost } from '@/types/blog';
import { Search, X, Tag, User } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  showAll?: boolean;
}

export default function BlogList({ posts, showAll = false }: BlogListProps) {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  // Computed values using useMemo for performance
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  const allAuthors = useMemo(() => {
    const authorSet = new Set<string>();
    posts.forEach(post => {
      if (post.author) authorSet.add(post.author);
    });
    return Array.from(authorSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // Apply author filter
    if (selectedAuthor) {
      filtered = filtered.filter(post => post.author === selectedAuthor);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    return filtered;
  }, [posts, searchQuery, selectedTags, selectedAuthor]);

  const displayPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3);

  // Helper functions
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedAuthor('');
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedAuthor;

  // Empty state when no posts
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
          <Search className="w-10 h-10 text-blue-600" />
        </div>
        <p className="text-gray-800 text-xl font-semibold mb-2">No blog posts available yet.</p>
        <p className="text-gray-600">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-400 shadow-sm"
        />
      </div>

      {/* Filters Section */}
      {(allTags.length > 0 || allAuthors.length > 0) && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Tag Filter Buttons - Left Side */}
            {allTags.length > 0 && (
              <div className="flex-1 space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Tag className="w-4 h-4 mr-2 text-blue-600" />
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Author Dropdown - Right Side */}
            {allAuthors.length > 0 && (
              <div className="lg:w-64 space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Filter by Author
                </label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-gray-900"
                >
                  <option value="">All Authors</option>
                  {allAuthors.map(author => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-start">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-5 py-2.5 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between py-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-600">
          Showing <span className="text-blue-600 font-semibold">{displayPosts.length}</span> of {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Posts Grid */}
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
        </div>
      ) : (
        // Empty state when no results match filters
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-200">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-800 text-xl font-semibold mb-2">No articles found</p>
          <p className="text-gray-600 mb-6">Try different search terms or filters</p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
