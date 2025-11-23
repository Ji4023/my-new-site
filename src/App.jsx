import React, { useState, useEffect } from 'react';
import { Play, X, Mail, Phone, Download, Award, Clock, Layers, Camera, Video, MonitorPlay } from 'lucide-react';

// 数据配置
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "城市脉搏 - 2024 宣传片",
    category: "商业广告",
    type: "commercial",
    image: "[https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80](https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    videoUrl: "[https://www.w3schools.com/html/mov_bbb.mp4](https://www.w3schools.com/html/mov_bbb.mp4)", 
    color: "bg-blue-500",
    desc: "负责全程剪辑与后期调色，展现城市快节奏生活。"
  },
  {
    id: 2,
    title: "Vogue 风格 - 时尚后台",
    category: "时尚大片",
    type: "fashion",
    image: "[https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80](https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    videoUrl: "[https://www.w3schools.com/html/mov_bbb.mp4](https://www.w3schools.com/html/mov_bbb.mp4)",
    color: "bg-red-500",
    desc: "快剪风格，配合重节奏音乐，捕捉秀场瞬间。"
  },
  {
    id: 3,
    title: "消失的海岸线",
    category: "纪录片",
    type: "documentary",
    image: "[https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    videoUrl: "[https://www.w3schools.com/html/mov_bbb.mp4](https://www.w3schools.com/html/mov_bbb.mp4)",
    color: "bg-green-500",
    desc: "获得2023独立影像节最佳剪辑提名作品。"
  },
  {
    id: 4,
    title: "霓虹 - 音乐录影带",
    category: "MV",
    type: "mv",
    image: "[https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80](https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    videoUrl: "[https://www.w3schools.com/html/mov_bbb.mp4](https://www.w3schools.com/html/mov_bbb.mp4)",
    color: "bg-yellow-500",
    desc: "赛博朋克风格调色，运用大量特效转场。"
  },
  {
    id: 5,
    title: "极简生活 VLOG",
    category: "短视频",
    type: "vlog",
    image: "[https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80](https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    videoUrl: "[https://www.w3schools.com/html/mov_bbb.mp4](https://www.w3schools.com/html/mov_bbb.mp4)",
    color: "bg-blue-500",
    desc: "抖音百万赞作品，治愈系剪辑节奏。"
  },
  {
    id: 6,
    title: "Tech Future 发布会",
    category: "商业广告",
    type: "commercial",
    image: "[https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80](https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    videoUrl: "[https://www.w3schools.com/html/mov_bbb.mp4](https://www.w3schools.com/html/mov_bbb.mp4)",
    color: "bg-green-500",
    desc: "多机位混剪，现场导播与后期制作。"
  }
];

const SKILLS = [
  { name: "Premiere Pro", level: 95, color: "bg-purple-600" },
  { name: "After Effects", level: 85, color: "bg-blue-600" },
  { name: "DaVinci Resolve", level: 90, color: "bg-pink-600" },
  { name: "Final Cut", level: 80, color: "bg-yellow-500" },
  { name: "Cinema 4D", level: 60, color: "bg-blue-400" },
];

const EXPERIENCE = [
  {
    year: "2022 - 至今",
    role: "高级视频剪辑师",
    company: "光影创意工作室",
    desc: "负责一线品牌（Nike, Apple等）TVC广告剪辑，统筹后期团队，把控成片质量。"
  },
  {
    year: "2020 - 2022",
    role: "编导 / 摄像",
    company: "新视界传媒",
    desc: "独立策划并制作多部百万级播放量的短纪录片，负责从脚本到后期的全流程。"
  },
  {
    year: "2018 - 2020",
    role: "剪辑助理",
    company: "字节跳动 (外包)",
    desc: "协助处理大量短视频素材，DIT数据管理，粗剪与字幕制作。"
  }
];

const VideoModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"><X size={40} /></button>
      <div className="w-full max-w-6xl bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        <div className="relative pt-[56.25%] bg-gray-900">
          <video className="absolute top-0 left-0 w-full h-full" controls autoPlay src={item.videoUrl}>Your browser does not support the video tag.</video>
        </div>
        <div className="p-6 bg-white text-black">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${item.color}`}>{item.category}</span>
            <h2 className="text-2xl font-bold tracking-tight">{item.title}</h2>
          </div>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = filter === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(item => item.type === filter);
  const categories = [
    { id: 'all', label: '全部作品', color: 'bg-gray-900 text-white' },
    { id: 'commercial', label: '商业广告', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
    { id: 'fashion', label: '时尚/MV', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
    { id: 'documentary', label: '纪录片', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  ];
  const scrollToSection = (id) => { const el = document.getElementById(id); if(el) el.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-yellow-200 selection:text-black">
      {selectedProject && (<VideoModal item={selectedProject} onClose={() => setSelectedProject(null)} />)}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="flex gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div><span>ZHANG.EDIT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-blue-600 transition-colors">作品集</button>
            <button onClick={() => scrollToSection('resume')} className="hover:text-red-600 transition-colors">简历</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-green-600 transition-colors">联系我</button>
            <button className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-transform active:scale-95 flex items-center gap-2"><Download size={16} /> 下载简历 PDF</button>
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8">用镜头捕捉节奏 <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500">用剪辑重塑故事</span></h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl font-light mb-10 leading-relaxed">你好，我是<span className="font-bold text-black">张伟</span>。一名专注于视觉叙事的视频剪辑师与编导。我擅长通过独特的节奏感和色彩语言，为品牌和故事注入灵魂。</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('portfolio')} className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"><Play size={20} fill="currentColor" /> 查看作品 Reel</button>
              <button onClick={() => scrollToSection('resume')} className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full text-lg font-bold hover:bg-gray-200 transition-all duration-300 border border-transparent hover:border-gray-300">了解更多</button>
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-0 -z-10 opacity-10"><MonitorPlay size={400} /></div>
      </header>

      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div><h2 className="text-4xl font-black mb-2 flex items-center gap-3">精选作品 <Layers className="text-blue-500" /></h2><p className="text-gray-500">点击卡片即可直接预览视频</p></div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setFilter(cat.id === 'all' ? 'all' : cat.id)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${filter === (cat.id === 'all' ? 'all' : cat.id) ? 'bg-black text-white shadow-lg scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}>{cat.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2" onClick={() => setSelectedProject(item)}>
                <div className="aspect-video w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100"><div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl"><Play size={32} className="ml-1 text-black" fill="currentColor" /></div></div>
                  <div className="absolute top-4 left-4 z-20"><span className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg ${item.color}`}>{item.category}</span></div>
                </div>
                <div className="p-6"><h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3><p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p></div>
                <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 absolute bottom-0 left-0 ${item.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><Clock className="text-red-500" /> 工作经历</h2>
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {EXPERIENCE.map((job, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 group-hover:bg-black group-hover:scale-125 transition-all shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 transform -translate-x-1/2 md:translate-x-0"><div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-white"></div></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all ml-16 md:ml-0">
                      <div className="flex justify-between items-center mb-1"><time className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{job.year}</time></div>
                      <div className="text-lg font-bold text-slate-900">{job.role}</div>
                      <div className="text-slate-500 text-sm font-medium mb-3">{job.company}</div>
                      <div className="text-slate-600 text-sm leading-relaxed">{job.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><Award className="text-yellow-500" /> 专业技能</h2>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-10">
                <h3 className="text-lg font-bold mb-6">软件掌握度</h3>
                <div className="space-y-6">
                  {SKILLS.map((skill) => (
                    <div key={skill.name}><div className="flex justify-between mb-2"><span className="font-bold text-sm">{skill.name}</span><span className="text-xs text-gray-400">{skill.level}%</span></div><div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${skill.color} relative`} style={{ width: `${skill.level}%` }}><div className="absolute top-0 right-0 bottom-0 w-1 bg-white/30 animate-pulse"></div></div></div></div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-colors group"><Camera className="w-8 h-8 mb-4 text-gray-400 group-hover:text-yellow-400" /><h4 className="font-bold text-lg mb-1">前期拍摄</h4><p className="text-sm text-gray-500 group-hover:text-gray-300">熟练使用 Sony/Red 系列摄影机，具备灯光布置能力。</p></div>
                <div className="p-6 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-colors group"><Video className="w-8 h-8 mb-4 text-gray-400 group-hover:text-blue-400" /><h4 className="font-bold text-lg mb-1">导演思维</h4><p className="text-sm text-gray-500 group-hover:text-gray-300">不仅是剪辑，更懂脚本拆解与叙事逻辑的重构。</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black mb-8">准备好开始下一个大项目了吗？</h2>
          <p className="text-xl text-gray-400 mb-12">我随时准备用我的创意和技术，为你的品牌创造视觉价值。欢迎随时联系。</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <a href="mailto:hello@zhang.edit" className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all"><Mail size={20} /> hello@zhang.edit</a>
            <a href="tel:+86123456789" className="flex items-center justify-center gap-3 px-8 py-4 border border-gray-700 rounded-full font-bold hover:border-white transition-all"><Phone size={20} /> +86 138 0000 0000</a>
          </div>
          <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 Zhang.Edit. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0"><a href="#" className="hover:text-white transition-colors">Bilibili</a><a href="#" className="hover:text-white transition-colors">Instagram</a><a href="#" className="hover:text-white transition-colors">Vimeo</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
