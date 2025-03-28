import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const pictures = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export const pageAtom = atom(0);
export const pages = [
  {
    front: 'book-cover',
    back: pictures[0]
  }
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length]
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: 'book-back'
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const scrollRef = useRef();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const audio = new Audio('/audio/turning-book-page.mp3');
    audio.play();
  }, [page]);

  // Enable to scroll horizontally
  const handleWheel = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <>
      <main className=" pointer-events-none select-none z-10 absolute inset-0 flex justify-end flex-col">
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div
            className="overflow-auto flex items-center gap-4 max-w-full p-10"
            ref={scrollRef}
            onWheel={handleWheel}
          >
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 rounded-full uppercase shrink-0 border ${
                  index === page ? 'bg-white/90 text-black' : 'bg-black/30 text-white'
                } ${isTabletOrMobile ? 'text-base px-2 py-2' : 'text-lg px-4 py-3'}`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? 'Cover' : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 rounded-full uppercase shrink-0 border ${
                page === pages.length ? 'bg-white/90 text-black' : 'bg-black/30 text-white'
              } ${isTabletOrMobile ? 'text-base px-2 py-2' : 'text-lg px-4 py-3'}`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div
        className="fixed inset-0 flex items-center select-none"
        style={{
          background: 'radial-gradient(circle, rgba(44,83,100,1) 0%, rgba(32,58,67,1) 87%)'
        }}
      >
        <div className="relative -rotate-2">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-xl lg:text-10xl font-black">React</h1>
            <h2 className="shrink-0 text-white text-5xl lg:text-8xl italic font-light">
              Dev Grisch
            </h2>
            <h2 className="shrink-0 text-white text-xl lg:text-12xl font-bold">Node.js</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Portfolio
            </h2>
            <h2 className="shrink-0 text-white text-5xl lg:text-9xl font-medium">Passionate</h2>
            <h2 className="shrink-0 text-white text-5xl lg:text-9xl font-extralight italic">
              Dedicated
            </h2>
            <h2 className="shrink-0 text-white text-5xl lg:text-9xl font-medium">Involved</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-xl text-10xl lg:text-10xl font-black">
              JavaScript
            </h1>
            <h2 className="shrink-0 text-white text-5xl lg:text-8xl italic font-light">
              Dev Grisch
            </h2>
            <h2 className="shrink-0 text-white text-xl lg:text-12xl font-bold">TypeScript</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Portfolio
            </h2>
            <h2 className="shrink-0 text-white text-5xl lg:text-9xl font-extralight italic">
              Passionate
            </h2>
            <h2 className="shrink-0 text-white text-5xl lg:text-9xl font-medium">Dedicated</h2>
            <h2 className="shrink-0 text-white text-5xl lg:text-9xl font-extralight italic">
              Involved
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
