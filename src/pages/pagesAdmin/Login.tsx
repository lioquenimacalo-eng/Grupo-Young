import { useState, useRef, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, ArrowRight, Mail, LockKeyhole } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Imagens do ramo imobiliário para o carrossel de fundo.
// Troque pelos caminhos das suas próprias imagens em /public/images quando tiver.
const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
];

const CAROUSEL_INTERVAL_MS = 5000;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const swiperRef = useRef<SwiperClass | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Chamada ao backend entra aqui depois
    console.log({ email, password });
    // Exemplo:
    // navigate("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#FFF8F1] p-0 sm:p-4 lg:p-8">
      <div className="mx-auto flex min-h-screen max-w-[1450px] overflow-hidden bg-white shadow-xl sm:min-h-[calc(100vh-2rem)] sm:rounded-[30px] lg:min-h-[calc(100vh-4rem)] lg:rounded-[40px]">
        {/* Lado esquerdo — visual */}
        <section className="relative hidden w-1/2 overflow-hidden bg-[#1A120B] lg:flex lg:min-h-full">
          {/* Carrossel de imagens de fundo (Swiper, efeito fade + autoplay) */}
          <Swiper
            modules={[Autoplay, EffectFade, Pagination, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: CAROUSEL_INTERVAL_MS, disableOnInteraction: false }}
            loop
            speed={1200}
            pagination={{ el: ".carousel-pagination", clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="absolute inset-0 h-full w-full"
          >
            {CAROUSEL_IMAGES.map((src) => (
              <SwiperSlide key={src}>
                <img
                  src={src}
                  alt="Imóvel em destaque"
                  className="h-full w-full object-cover opacity-90"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/25 to-black/20" />

          {/* Indicadores do carrossel (paginação do Swiper) */}
          <div className="carousel-pagination absolute left-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 xl:left-10" />

          <div className="absolute inset-x-0 top-0 z-20 flex w-full items-center justify-between p-8 xl:p-10">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/imgbg.png"
                alt="Grupo Young"
                className="h-9 w-auto object-contain drop-shadow-md"
              />
              <span className="text-lg font-semibold tracking-tight text-white drop-shadow-md">
                Grupo Young
              </span>
            </Link>
          </div>
          <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between xl:bottom-10 xl:left-10 xl:right-10">
            <div>
              <p className="mb-2 text-sm font-medium text-white/70">
                GRUPO YOUNG
              </p>
              <h2 className="max-w-md text-3xl font-bold leading-tight text-white xl:text-4xl">
                Construindo novas oportunidades.
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Imagem anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-[#1A120B]"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Próxima imagem"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-[#1A120B]"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
        {/* Lado direito — formulário */}
        <section className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
          <div className="mb-12 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 lg:hidden">
              <img
                src="/imgbg.png"
                alt="Grupo Young"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-black tracking-[-0.04em] text-[#1A120B]">
                Grupo Young
              </span>
            </Link>
            <button
              type="button"
              className="ml-auto rounded-full border border-orange-100 px-4 py-2 text-xs font-medium text-orange-800 transition hover:border-orange-300"
            >
              🇦🇴 PT
            </button>
          </div>
          <div className="mx-auto w-full max-w-[430px]">
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#1A120B] sm:text-5xl">
              Olá novamente.
            </h1>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Entre na sua conta para continuar.
            </p>
            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    required
                    className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Palavra-passe
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-orange-600 hover:underline"
                  >
                    Esqueceu a palavra-passe?
                  </Link>
                </div>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a sua palavra-passe"
                    required
                    className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Esconder palavra-passe"
                        : "Mostrar palavra-passe"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="h-14 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
              >
                Entrar
              </button>
            </form>
            <p className="mt-12 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Grupo Young. Todos os direitos
              reservados.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
