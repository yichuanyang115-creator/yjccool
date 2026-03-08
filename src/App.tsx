import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Database, Code, QrCode, ChevronRight, User } from "lucide-react";
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
        <filter id="water-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.1" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" from="0.02 0.1" to="0.03 0.15" dur="3s" repeatCount="indefinite" alternate="true" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
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
              className="p-8 md:p-12 relative"
            >
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                <User size={300} />
              </div>
              
              <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-x-2">
                <div className="text-geek-cyan text-xs mb-4 flex items-center gap-2">
                  <ChevronRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" /> INITIATING_USER_PROFILE...
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                  <span className="pixel-gradient-text">杨京川</span> <span className="blink text-geek-cyan">_</span>
                </h1>
                <p className="text-geek-green mb-2 text-lg tracking-widest">[ROLE: AI_PRODUCT_MANAGER]</p>
                
                <p className="text-sm text-white/70 tracking-wide mb-4 transition-colors duration-500 group-hover:text-white/90">
                  以体验为灵魂，以技术为骨骼，构建 AI 产品新范式
                </p>
                
                <div className="flex flex-row flex-wrap gap-6 md:gap-8 text-sm text-white/70 border-t border-white/10 pt-4 transition-colors duration-500 group-hover:border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">TEL:</span>
                    <a href="tel:17766542666" className="hover:text-geek-cyan transition-colors text-base">177 6654 2666</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">EMAIL:</span>
                    <a href="mailto:17766542666@163.com" className="hover:text-geek-cyan transition-colors text-base">17766542666@163.com</a>
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
                description="主导智能化服务升级，重塑企业内部服务体验，打造下一代智能办公范式。"
                delay={0.2}
                details={[
                  { title: "敬请期待", content: "" }
                ]}
              />
              <ExperienceItem 
                company="百度客悦"
                enCompany="Baidu"
                role="AI产品经理"
                project="智能客服"
                description="打造标杆级智能客服解决方案，实现商业价值与用户体验的双重跃升。"
                delay={0.3}
                details={[
                  { title: "项目背景", content: "面对企业用户对多轮对话精准度和长尾意图识别率的更高要求，客悦智能客服平台，深化大模型在多模态交互、意图识别、自动化运营中的应用，提升企业客户服务与营销一体化能力。" },
                  { title: "数据采集与问题定位", content: "整合企业产品文档、客服工单、对话日志等多源数据，分析点踩及后台数据从badcase中定位“需求忽略、需求曲解、缺失关联需求”三类问题，同步搭建聚焦答复率、准确率的核心指标统计看板。" },
                  { title: "知识库搭建", content: "预处理多源数据后，采用摘要式为主、关键词提取与模版抽取为辅的方式，筛选高价值信息，重点聚焦业务核心场景。基于文心大模型从文档中提取QA对并丰富问题的多样性，进而实现问题的多重扩展，保证问题的召回命中率。对10万条历史对话进行语义向量化，通过聚类算法(如DBSCAN)生成高频问题标签，完成历史对话聚类分析。" },
                  { title: "意图识别", content: "利用大模型语义理解能力，设计三层树状意图体系，顶层区分业务模块，中层场景细分，底层具体应答策略。通过RAG技术，将知识库与实时更新的行业数据关联，增强长尾问题回答能力。搭建自动化优化机制，完成用户反馈闭环，定期评估知识库覆盖率与回答准确率，优化大模型Prompt模板。" },
                  { title: "项目成果", content: "完成5大业务场景、生成1000+标准QA对、8000+扩展QA对的知识沉淀，覆盖90%以上高频咨询场景，标准问回复准确率97%。转人工率下降至27%，客户满意度提升至92%(78%)。" }
                ]}
              />
              <ExperienceItem 
                company="用友网络"
                enCompany="Yonyou"
                role="AI产品经理"
                project="ChatBI"
                description="探索前沿数据交互范式，赋能企业级商业智能决策，引领数据分析的智能化变革。"
                delay={0.4}
                details={[
                  { title: "项目背景", content: "针对销售管理部业务人员数据获取与分析链路长、耗时多的痛点，开发ChatBI问答式数据分析平台，通过自然语言交互实现数据可视化的即时生成与业务问题的智能归因。" },
                  { title: "市场调研与指标搭建", content: "调研析言GBI、腾讯ChatBI产品明确产品定位与技术实现。与业务方梳理数据指标与分析维度字典。" },
                  { title: "智能问答交互", content: "参与设计NL2SQL的转化链条，包括语义理解、意图识别、意图澄清和归因分析的路径，当意图清晰后生成伪SQL校验，最终SQL执行与可视化展示并归因分析。" },
                  { title: "语义理解优化", content: "设计知识名词、同义词与业务术语配置模块，大幅提升语义解析的准确率至80%。引导模型多维理解。" },
                  { title: "用户体验优化", content: "引入引导式提问与智能追问设计，降低用户提问门槛，提升深度分析准确率。" },
                  { title: "深度分析功能", content: "针对核心管理指标，设计系列深度分析Prompt，在此基础上结合人工分析思路与框架开展深度归因分析，通过根据结果智能推测子问题，引导用户进行连续深度分析，形成完整的分析链路。同时实现结构化数据分析报告的自动化输出。" },
                  { title: "项目成果", content: "产品问答准确率超过85%，大大提升业务人员每日数据获取与分析效率。成功覆盖核心业务模块80%数据分析需求。产品嵌入到企业CRM中用于销售分析，商业化已有100+客户采购。研发管理看板在各事业部领导层落地使用。" }
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
                delay={0.5}
                link="https://www.ycwrite.online/"
              />
              <ProjectCard 
                title="BuddyBase"
                subtitle="知识库智能问答系统"
                description="构建私有知识库检索与问答中枢，提供低幻觉、高准确率的专属问答体验"
                number="0x02"
                delay={0.6}
                link="https://buddybase.netlify.app/"
              />
              <ProjectCard 
                title="AI 简历优化助手"
                subtitle="智能职业发展辅助平台"
                description="针对产品经理的AI简历优化平台，帮助用户快速识别简历短板并生成优化建议"
                number="0x03"
                delay={0.7}
                link="https://pm-resume-ai-tool.netlify.app/"
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
            viewport={{ once: true }}
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
      viewport={{ once: true }}
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

function ProjectCard({ title, subtitle, description, number, delay, link }: { title: string, subtitle: string, description: string, number: string, delay: number, link?: string }) {
  const CardContent = (
    <SpotlightCard 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`p-6 md:p-8 flex flex-col h-full ${link ? 'cursor-pointer' : ''}`}
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
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-white/30 transition-all duration-500 group-hover:text-geek-cyan group-hover:border-white/20">
        <ChevronRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" /> EXECUTE_MODULE
      </div>
    </SpotlightCard>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
