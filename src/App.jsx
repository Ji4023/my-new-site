import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase'; // 引入我们刚才建好的“钥匙”文件
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Camera, Send, MessageCircle, Heart, Loader2 } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [commentInputs, setCommentInputs] = useState({}); // 记录每个帖子的评论输入框

  // 1. 监听数据库变化（只要有人上传，这里自动刷新）
  useEffect(() => {
    // 查询 'posts' 集合，按时间倒序排列
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    
    // 实时监听
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  // 2. 上传图片处理
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // A. 把图片存到 Storage (云存储)
      // 文件名加上时间戳防止重名
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      
      // 获取图片的下载链接
      const url = await getDownloadURL(storageRef);

      // B. 把帖子信息存到 Database (数据库)
      await addDoc(collection(db, "posts"), {
        imageUrl: url,
        timestamp: Date.now(),
        likes: 0,
        comments: [] // 初始化空评论
      });

      setFile(null);
      alert("发布成功！");
    } catch (error) {
      console.error("上传失败", error);
      alert("上传失败，请检查控制台或Firebase规则");
    }
    setUploading(false);
  };

  // 3. 发送评论处理
  const handleComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    // 找到对应的帖子文档
    const postRef = doc(db, "posts", postId);
    
    // 更新文档，向 comments 数组里追加一条评论
    await updateDoc(postRef, {
      comments: arrayUnion({
        text: text,
        time: new Date().toLocaleString()
      })
    });

    // 清空输入框
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  // 4. 点赞处理 (简单版)
  const handleLike = async (postId, currentLikes) => {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
          likes: (currentLikes || 0) + 1
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text flex items-center gap-2">
            <Camera className="text-purple-600" /> 灵感社区
          </h1>
          <div className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-500">
            {posts.length} 张图片
          </div>
        </div>
      </nav>

      {/* 上传区域 */}
      <div className="max-w-2xl mx-auto p-4 mt-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 text-center transition-all hover:shadow-md">
          <input 
            type="file" 
            id="fileInput"
            className="hidden" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          
          {!file ? (
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-3 text-gray-400 hover:text-purple-600 transition-colors py-4">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                 <Camera size={32} />
              </div>
              <span className="font-bold text-sm">点击这里，分享你的瞬间</span>
            </label>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                已选择: <span className="text-purple-600">{file.name}</span>
              </div>
              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 disabled:bg-gray-400 flex items-center gap-2 transition-all active:scale-95"
              >
                {uploading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {uploading ? "正在上传..." : "立即发布"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 瀑布流展示区 */}
      <div className="max-w-2xl mx-auto p-4 space-y-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-lg">
            {/* 图片 */}
            <div className="relative group">
                <img src={post.imageUrl} alt="Post" className="w-full h-auto object-cover max-h-[500px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-xs opacity-80">发布于 {new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
            </div>
            
            {/* 互动区 */}
            <div className="p-5">
              <div className="flex gap-6 mb-4 border-b border-gray-100 pb-4">
                <button 
                    onClick={() => handleLike(post.id, post.likes)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group"
                >
                  <Heart size={24} className="group-hover:fill-red-500 transition-all" /> 
                  <span className="font-bold text-sm">{post.likes || 0}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle size={24} /> 
                  <span className="font-bold text-sm">{post.comments?.length || 0}</span>
                </div>
              </div>

              {/* 评论列表 */}
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                {post.comments && post.comments.map((comment, index) => (
                  <div key={index} className="text-sm flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 shrink-0"></div>
                    <div className="bg-gray-50 px-3 py-2 rounded-r-xl rounded-bl-xl">
                        <span className="text-gray-800">{comment.text}</span>
                    </div>
                  </div>
                ))}
                {(!post.comments || post.comments.length === 0) && (
                  <p className="text-xs text-gray-400 italic pl-8">还没有评论，快来抢沙发~</p>
                )}
              </div>

              {/* 写评论 */}
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-black shrink-0"></div>
                <input 
                  type="text" 
                  placeholder="写下你的想法..." 
                  className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                />
                <button 
                  onClick={() => handleComment(post.id)}
                  disabled={!commentInputs[post.id]}
                  className="p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
            <div className="text-center text-gray-400 py-20">
                <p>还没有图片，快去上传第一张吧！🚀</p>
            </div>
        )}
      </div>
    </div>
  );
}