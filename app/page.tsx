'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, Clock, Film, Download, Play, Zap } from 'lucide-react'

interface GeneratedVideo {
  id: string
  prompt: string
  url: string
  timestamp: Date
  duration: number
  status: 'generating' | 'completed'
}

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState(5)
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [videos, setVideos] = useState<GeneratedVideo[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    const newVideo: GeneratedVideo = {
      id: Date.now().toString(),
      prompt: prompt,
      url: '',
      timestamp: new Date(),
      duration: duration,
      status: 'generating'
    }

    setVideos(prev => [newVideo, ...prev])

    // Simulate video generation with a delay
    setTimeout(() => {
      setVideos(prev => prev.map(v =>
        v.id === newVideo.id
          ? { ...v, status: 'completed', url: generatePlaceholderVideo(v.prompt) }
          : v
      ))
      setIsGenerating(false)
    }, 8000)
  }

  const generatePlaceholderVideo = (prompt: string): string => {
    // Generate a placeholder video URL with encoded prompt
    const encodedPrompt = encodeURIComponent(prompt.slice(0, 50))
    return `https://placehold.co/1920x1080/667eea/white?text=${encodedPrompt}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Sora AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-purple-300 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Advanced Video Generation
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Create Videos from Text
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Transform your ideas into stunning videos using state-of-the-art AI technology
          </p>
        </motion.div>

        {/* Generation Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-12"
        >
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Describe your video
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene beach at sunset with waves gently crashing on the shore..."
                className="w-full h-32 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration: {duration}s
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>3s</span>
                  <span>10s</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['16:9', '9:16', '1:1'].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        aspectRatio === ratio
                          ? 'bg-purple-600 text-white'
                          : 'bg-black/30 text-gray-300 hover:bg-black/40'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating Video...' : 'Generate Video'}
            </button>
          </div>
        </motion.div>

        {/* Generated Videos */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Film className="w-6 h-6" />
            Generated Videos
          </h3>

          {videos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/5 rounded-2xl border border-white/10"
            >
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">No videos generated yet. Start by creating your first video!</p>
            </motion.div>
          ) : (
            <div className="video-grid">
              <AnimatePresence>
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all"
                  >
                    {/* Video Preview */}
                    <div className="relative aspect-video bg-black/50">
                      {video.status === 'generating' ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-sm text-purple-300">Generating...</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={video.url}
                            alt={video.prompt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                              <Play className="w-8 h-8 text-purple-600 ml-1" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                        {video.prompt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {video.duration}s
                        </span>
                        {video.status === 'completed' && (
                          <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400 text-sm">
          <p>Powered by advanced AI models • Create stunning videos from text</p>
        </div>
      </footer>
    </div>
  )
}
