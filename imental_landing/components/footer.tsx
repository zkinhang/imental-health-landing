import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-5 py-12 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          &copy; 2025 
          <Image 
            src="/withyou.png" 
            alt="WithYou Logo" 
            width={160} 
            height={160}
            className="w-40 h-20 inline-block"
          />
          | Your mental health matters.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Designed with care for your well-being 💙
        </p>
      </div>
    </footer>
  );
}
