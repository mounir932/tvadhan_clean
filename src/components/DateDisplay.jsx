const DateDisplay = () => {
  const date = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Fond avec effet glassmorphism */}
        <div className="absolute inset-0 backdrop-blur-[40px] rounded-[30px] bg-[#1a1a1a]/50 border-white/10 border shadow-lg"></div>
        {/* Contenu */}
        <div className="relative">
          <span className="block text-[min(5vw,80px)] font-medium text-white tracking-[0.04em] font-poppins capitalize">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateDisplay;
