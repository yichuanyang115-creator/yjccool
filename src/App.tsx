import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Database, Code, QrCode, ChevronRight, User, ExternalLink } from "lucide-react";
import Background3D from "./components/Background3D";

function SpotlightCard({ children, className = "", ...props }: any) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ y: -2 }}
      className={`tech-border group overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 ease-in-out z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,255,255,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-geek-cyan/30 relative font-mono text-sm overflow-x-hidden">
      <Background3D />
      <div className="scanline"></div>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="water-ripple" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise">
            <animate 
              attributeName="baseFrequency" 
              values="0.01 0.05; 0.012 0.07; 0.01 0.05" 
              dur="8s" 
              repeatCount="indefinite" 
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/20 pb-4 mb-12 gap-4">
          <div className="flex items-center gap-2 text-geek-cyan">
            <Terminal size={18} />
            <span className="font-bold tracking-widest">SYS.LOGIN // YJC_OS_v2.0</span>
          </div>
          <div className="flex gap-6 text-white/50 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-geek-green animate-pulse"></span>
              STATUS: <span className="text-geek-green">ONLINE</span>
            </span>
            <span>PORT: 3000</span>
            <span>LATENCY: 12ms</span>
          </div>
        </header>

        <main className="flex flex-col gap-24 mt-12">
          
          {/* LAYER 1: Profile & Intro */}
          <section>
            <SpotlightCard 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 relative group bg-black/10 border-white/5 backdrop-blur-sm"
            >
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                <User size={300} />
              </div>
              
              <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-x-2">
                <div className="text-geek-cyan text-xs mb-4 flex items-center gap-2">
                  <ChevronRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" /> INITIATING_USER_PROFILE...
                </div>
                
                <div className="relative inline-block mb-2">
                  {/* Camera Scan Overlay - Focused on Name */}
                  <div className="absolute -inset-x-4 -inset-y-2 pointer-events-none z-20">
                    <div className="camera-scan-line"></div>
                    <div className="camera-scan-glow"></div>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] relative z-10">
                    <span className="pixel-glitch-text">杨京川</span> <span className="blink text-geek-cyan">_</span>
                  </h1>
                </div>

                <p className="text-geek-green mb-2 text-lg tracking-widest">[ROLE: AI_PRODUCT_MANAGER]</p>
                
                <p className="text-sm text-white/70 tracking-wide mb-4 transition-colors duration-500 group-hover:text-white/90">
                  以体验为灵魂，以技术为骨骼，构建AI产品新范式
                </p>
                
                <div className="flex flex-row flex-wrap gap-6 md:gap-8 text-sm text-white/70 border-t border-white/10 pt-4 transition-colors duration-500 group-hover:border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">TEL:</span>
                    <a href="tel:18646117719" className="hover:text-geek-cyan transition-colors text-base">186 4611 7719</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">EMAIL:</span>
                    <a href="mailto:yichuan115@163.com" className="hover:text-geek-cyan transition-colors text-base">yichuan115@163.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">LOC:</span>
                    <span className="text-base">CHINA</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </section>

          {/* LAYER 2: Experience */}
          <section>
            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
              <Cpu size={24} className="text-geek-cyan" />
              <h2 className="text-2xl font-bold tracking-widest text-white">
                实习经历
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <ExperienceItem 
                company="平安科技"
                enCompany="Ping An Tech"
                role="AI产品经理"
                project="员工万能服务"
                description="四大场景智能化升级，重塑企业内部办公服务体验，打造下一代智能办公范式"
                delay={0.2}
                details={[
                  { title: "项目背景", content: "推动办公软件升级为对话式 AI 助手，为平安集团 32 万员工构建\"万能服务\"AI 办公工作台，通过\"行政、人事、财务、培训\"场景升级，全面整合员工服务、数据，以极简对话交互完成核心场景下的\"问、查、办\"全链路一键办理。" },
                  { title: "场景功能设计", content: "跨部门完成需求对齐，主导负责人事、财务共10场景全链路设计，涵盖意图识别、槽位提取、交互逻辑、prompt设计及功能测试；通过系统梳理各场景边界规则，将复杂业务压缩为低门槛对话式办理流程。" },
                  { title: "结构化prompt", content: "采用角色、规则、示例、输出和限制等模块化架构实现高精度意图识别、多槽位信息提取及任务自动化。" },
                  { title: "场景功能测试", content: "独立撰写核心测试用例集，对badcase按意图、槽位、规则、回复、丢失五类错误进行归因分类。" },
                  { title: "对话跟踪引导", content: "通过结构化存储历史意图与槽位结果，支持模型在用户增量表达时，实现任务链路内槽位复用；业务完成后根据业务规则与模型判断触发推荐，引导至下一步可执行服务，构建完整服务闭环。" },
                  { title: "项目结果", content: "意图准确率92%，服务完成率52.76%，端到端响应时间4.28秒（5.7秒）。" }
                ]}
              />
              <ExperienceItem 
                company="平安科技"
                enCompany="Ping An Tech"
                role="AI产品经理"
                project="AI 保险规划师"
                description="基于大模型构建个性化智能导购体系，重塑保险配置体验，驱动业务高效转化。"
                delay={0.3}
                details={[
                  { title: "项目背景", content: "针对传统人工客服高成本低转化，以及存在用户信任屏障的痛点。构建6大非车险种的智能导购体系，通过AI能力的智能选保、千人千品和产品解读，为用户提供个性化的保险建议。" },
                  { title: "AI家庭保障", content: "定义基于角色/年龄/地区/收入特征，基于用户特征，利用大模型构建千人千面的产品组合推荐引擎，针对生命周期三阶段的差异化推荐医疗/意外/重疾保障方案；该能力AI转化率3%。" },
                  { title: "语义摘要优化", content: "通过LLM构建“检索-提炼-结论”链路，利用结构化 Prompt 自动总结保险产品保障内容。" },
                  { title: "导购策略", content: "将泛化式话术升级为“浏览记录/热点新闻/推荐产品/通用话术”的个性化模板，该能力AI转化率1.3%。" }
                ]}
              />
              <ExperienceItem 
                company="唯品会"
                enCompany="Vipshop"
                role="策略产品经理"
                project="用户增长 (Push 策略)"
                description="深度整合厂商生态与 AI 能力，构建千人千面 Push 策略体系，驱动用户活跃与点击效率双重增长。"
                delay={0.4}
                details={[
                  { title: "项目背景", content: "为提升Push覆盖人群和点击率、降低用户侧疲劳度、提升运营效率，部门与安卓手机厂商建立商务合作，并接入厂商生态的能力，同时结合AI能力实现批量化、个性化文案生成。北极星指标：首唤人数；" },
                  { title: "策略搭建", content: "针对低活人群设计爆款商品通投策略；基于用户行为的商品召回，通过变量内嵌设计个性化Push策略，实现千人千面推送；与算法团队协作优化Push素材分发模型。策略覆盖度90%+，点击率1.37%（0.74%）。" },
                  { title: "平台能力建设", content: "厂商商业化通道接入投放平台（策略设置、厂商权限、素材配置、轮播配置）；建设素材AB实验能力。" },
                  { title: "AI生成与轮播", content: "选择适配电商文案生成模型，并构建多变量结构化Prompt，确保AI生成文案适配多场景，保持高质量多样性文案持续生成。设计自动轮播能力，实现“配置要求→AI批量生成文案→人工圈选投放→自动轮播”；将AI生成接入PUSH素材语料库，同时回流投放数据，持续优化AI模型。功能上线后，素材AI化100%，点击效率提升10%+；" }
                ]}
              />
              <ExperienceItem 
                company="用友网络"
                enCompany="Yonyou"
                role="AI产品经理"
                project="ChatBI"
                description="探索前沿数据交互范式，赋能企业级商业智能决策，引领数据分析的智能化变革。"
                delay={0.5}
                details={[
                  { title: "项目背景", content: "针对销售部业务人员数据获取与分析链路长、耗时多的痛点，开发ChatBI问答式数据分析平台，包括语义理解、意图识别、意图澄清和归因分析的路径。通过自然语言交互实现数据可视化的即时生成与业务问题的智能归因。" },
                  { title: "语义理解优化", content: "设计知识名词、同义词与业务术语配置模块，大幅提升语义解析的准确率至80%。引导模型多维理解。" },
                  { title: "深度分析功能", content: "针对核心管理指标，设计系列深度分析Prompt，在此基础上结合人工分析框架开展深度归因分析，通过根据结果智能推测子问题，引导用户进行连续深度分析，形成完整的分析链路。同时实现结构化数据分析报告的自动化输出。" },
                  { title: "项目成果", content: "产品问答准确率超过85%，覆盖核心业务模块80%数据分析需求" }
                ]}
              />
            </div>
          </section>

          {/* LAYER 3: Projects */}
          <section>
            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
              <Database size={24} className="text-geek-cyan" />
              <h2 className="text-2xl font-bold tracking-widest text-white">
                项目经历
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <ProjectCard 
                title="WriteMaster"
                subtitle="AI 科普文章自动化生成系统"
                description="基于大语言模型的端到端内容生成引擎，实现高质量科普内容的规模化、标准化生产。"
                number="0x01"
                delay={0.6}
                link="https://www.ycwrite.online/"
                secondaryLink="https://pcn41la219k8.feishu.cn/wiki/FW0Gw4WlNiPTMykUP30cxXLpnic?from=from_copylink"
              />
              <ProjectCard 
                title="BuddyBase"
                subtitle="知识库智能问答系统"
                description="构建私有知识库检索与问答中枢，提供低幻觉、高准确率的专属问答体验"
                number="0x02"
                delay={0.7}
                link="https://buddybase.netlify.app/"
                secondaryLink="https://pcn41la219k8.feishu.cn/wiki/GbrXw8Y20io53XkmrndcJW8anQd?from=from_copylink"
              />
              <ProjectCard 
                title="AI 简历优化助手"
                subtitle="智能职业发展辅助平台"
                description="针对产品经理的AI简历优化平台，帮助用户快速识别简历短板并生成优化建议"
                number="0x03"
                delay={0.8}
                link="https://pm-resume-ai-tool.netlify.app/"
                secondaryLink="https://pcn41la219k8.feishu.cn/wiki/TuKmwa04ZiR4aTkIicLcbhS2nTd?from=from_copylink"
              />
              <ProjectCard 
                title="合同智能审核系统"
                subtitle="智能合同风控与审核平台"
                description="基于大模型的智能合同审核系统，实现合同条款自动比对、风险识别与合规审查，大幅提升法务工作效率。"
                number="0x04"
                delay={0.9}
                secondaryLink="https://pcn41la219k8.feishu.cn/wiki/Hm86wEVuFiX7gIkTYHhcwEfenjc"
              />
            </div>
          </section>

        </main>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-16 opacity-50">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
          <span className="text-geek-cyan font-mono text-xs tracking-widest">EOF // END_OF_MODULES</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
        </div>

        {/* Contact / QR Code Section */}
        <section>
          <SpotlightCard 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="p-6 md:p-8"
          >
            <div className="flex flex-row items-center justify-between gap-6 md:gap-12 w-full">
              <div className="flex-1 transform transition-transform duration-500 group-hover:translate-x-2">
                <p className="text-geek-cyan text-xs mb-4 flex items-center gap-2">
                  <ChevronRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" /> ESTABLISH_CONNECTION
                </p>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 flex items-center gap-2 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                  期待与您共创未来<span className="blink text-geek-cyan">_</span>
                </h2>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl transition-colors duration-500 group-hover:text-white/80">
                  如果您正在寻找一位对 AI 充满热情、具备实战经验且追求极致的产品经理，欢迎与我联系。
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-2 md:gap-3 shrink-0 transform transition-transform duration-500 group-hover:-translate-x-2">
                <div className="w-24 h-24 md:w-32 md:h-32 border border-white/20 p-2 relative overflow-hidden bg-black/50 transition-colors duration-500 group-hover:border-geek-cyan/50">
                  <img 
                    src="https://i.postimg.cc/WpW5QM48/jie-ping2026-03-09-02-34-13.png" 
                    alt="WeChat QR Code"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-xs md:text-sm font-bold transition-colors duration-500 group-hover:text-geek-cyan">WeChat_ID_QR</p>
                  <p className="text-white/40 text-[10px] md:text-xs mt-1">Scan to connect</p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </section>
        
        <footer className="mt-24 border-t border-white/20 pt-6 flex justify-between items-center text-xs text-white/30">
          <span>SYSTEM_HALTED: FALSE</span>
          <span>© 2026 YJC_PORTFOLIO. ALL RIGHTS RESERVED.</span>
        </footer>
      </div>
    </div>
  );
}

function ExperienceItem({ company, enCompany, role, project, description, delay, details }: { company: string, enCompany: string, role: string, project: string, description: string, delay: number, details?: {title: string, content: string}[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SpotlightCard 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className={`p-6 md:p-8 ${details ? 'cursor-pointer' : ''}`}
      onClick={() => details && setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-white/10 pb-4 gap-4 transition-colors duration-500 group-hover:border-white/20">
        <div className="transform transition-transform duration-500 group-hover:translate-x-2">
          <h3 className="text-xl md:text-2xl text-geek-cyan font-bold transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]">
            {company} <span className="text-white/40 text-sm font-normal transition-colors duration-500 group-hover:text-white/60">:: {enCompany}</span>
          </h3>
          <p className="text-geek-green mt-2 text-sm md:text-base">{role}</p>
        </div>
        <div className="text-left md:text-right transform transition-transform duration-500 group-hover:-translate-x-2 flex items-center gap-4">
          <span className="bg-white/10 px-3 py-1.5 text-xs md:text-sm tracking-widest border border-white/5 transition-all duration-500 group-hover:bg-geek-cyan/10 group-hover:border-geek-cyan/30 group-hover:text-geek-cyan">MODULE: {project}</span>
          {details && (
            <ChevronRight size={16} className={`text-white/40 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          )}
        </div>
      </div>
      <p className="text-white/70 leading-relaxed text-sm md:text-base mt-4 transition-colors duration-500 group-hover:text-white/90">
        <span className="text-geek-cyan mr-2 inline-block transition-transform duration-500 group-hover:translate-x-1">{'>'}</span>{description}
      </p>

      <AnimatePresence>
        {details && isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24, paddingTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-white/10 flex flex-col gap-4 overflow-hidden"
          >
            {details.map((detail, idx) => (
              <div key={idx} className="text-sm md:text-base">
                <span className="text-geek-cyan font-bold mr-2">[{detail.title}]</span>
                <span className="text-white/80 leading-relaxed">{detail.content}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}

function ProjectCard({ title, subtitle, description, number, delay, link, secondaryLink }: { title: string, subtitle: string, description: string, number: string, delay: number, link?: string, secondaryLink?: string }) {
  return (
    <SpotlightCard 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className="p-6 md:p-8 flex flex-col h-full group"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-white/30 text-sm tracking-widest font-bold transition-colors duration-500 group-hover:text-geek-cyan/70">[{number}]</div>
        <Code size={18} className="text-white/30 transition-all duration-500 group-hover:text-geek-cyan group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
      </div>
      
      <div className="transform transition-transform duration-500 group-hover:translate-x-2">
        <h3 className="text-xl md:text-2xl text-white font-bold mb-2 transition-all duration-500 group-hover:text-geek-cyan group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">{title}</h3>
        <h4 className="text-geek-green text-sm mb-4">{subtitle}</h4>
      </div>
      
      <p className="text-white/70 text-sm md:text-base leading-relaxed flex-grow transition-colors duration-500 group-hover:text-white/90">
        {description}
      </p>
      
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center">
        {link && (
          <button
            onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-white/40 hover:text-geek-cyan hover:bg-geek-cyan/10 hover:border-geek-cyan/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] group/btn"
          >
            <ChevronRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            访问项目
          </button>
        )}
        
        {secondaryLink && (
          <button
            onClick={() => window.open(secondaryLink, '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/40 hover:text-geek-cyan hover:bg-geek-cyan/10 hover:border-geek-cyan/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] group/btn"
          >
            <ExternalLink size={16} className="transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5" />
            演示说明
          </button>
        )}
      </div>
    </SpotlightCard>
  );
}
