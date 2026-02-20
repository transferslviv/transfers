'use client';

export default function AboutSection() {
  return (
    <section className="w-full bg-[#F3F3F3] px-[15px] md:px-[50px] py-[60px] md:py-[150px]">
      <div className="flex flex-col lg:flex-row items-center gap-[40px] md:gap-[80px] lg:gap-[50px] w-full max-w-[1425px] mx-auto">
        
        {/* Title - Mobile/Tablet only */}
        <h2 
          className="order-1 lg:hidden text-[30px] md:text-[60px] text-[#070707] font-black leading-[100%]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          ПРО НАС
        </h2>

        {/* Map Image */}
        <div className="order-2 lg:order-1 w-full lg:w-[685px]">
          <img 
            src="/images/map.png" 
            alt="Карта України - TransferLviv" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="order-3 lg:order-2 w-full lg:w-[685px] flex flex-col items-start gap-[80px]">
          
          {/* Title - Desktop only */}
          <h2 
            className="hidden lg:block text-[60px] text-[#070707] font-black leading-[100%]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            ПРО НАС
          </h2>

          {/* Description */}
          <p 
            className="text-[12px] md:text-[18px] text-[#070707] leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            <strong>TRANSFERLVIV</strong> - це українська компанія, яка надає трансферні послуги преміум-класу по Україні та за її межами. Розвиваємо культуру професійних якісних, скоординованих трансферних послуг, які задовольняють запити клієнтів, створюють приємні враження і дозволяють їм відчувати безпеку та турботу протягом всієї поїздки.
          </p>
        </div>

      </div>
    </section>
  );
}
