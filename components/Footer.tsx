export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] py-[48px] px-6 md:px-[80px] bg-[#0A0A0A] relative z-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="font-syne text-[24px] font-[700] text-white tracking-[-0.03em]">Redwan Ahmmed</div>
          <div className="hidden md:block w-[1px] h-4 bg-[rgba(255,255,255,0.2)]" />
          <div className="font-inter text-[13px] text-[#888]">Creative Engineer</div>
          <div className="hidden md:block w-[1px] h-4 bg-[rgba(255,255,255,0.2)]" />
          <div className="font-inter text-[12px] text-[#555]">Based in India & UAE</div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
          <a href="mailto:reah30244@gmail.com" className="font-inter text-[14px] text-[#888] hover:text-white transition-colors duration-300">
            reah30244@gmail.com
          </a>
          <div className="hidden md:block w-[1px] h-4 bg-[rgba(255,255,255,0.2)]" />
          <div className="font-inter text-[12px] text-[#555]">
            © {new Date().getFullYear()} Redwan Ahmmed. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
