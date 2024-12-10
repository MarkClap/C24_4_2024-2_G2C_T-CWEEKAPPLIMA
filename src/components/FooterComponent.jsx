import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function FooterComponent() {
    return (
        <footer className="bg-sky-500/90 backdrop-blur-md shadow-lg text-white mt-10">
            <div className="max-w-[110rem] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sección de Información */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-lg font-bold uppercase">Sobre Nosotros</h2>
                    <p className="text-sm leading-relaxed">
                        Tecsup es una institución dedicada a la formación profesional
                        en tecnología e innovación. Creemos en el poder del aprendizaje continuo.
                    </p>
                </div>

                {/* Navegación Rápida */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-lg font-bold uppercase">Navegación</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="text-sm hover:underline hover:text-sky-300 transition-colors"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/events"
                                className="text-sm hover:underline hover:text-sky-300 transition-colors"
                            >
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/scores"
                                className="text-sm hover:underline hover:text-sky-300 transition-colors"
                            >
                                Puntajes
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-lg font-bold uppercase">Síguenos</h2>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-sky-500 rounded-full shadow-md hover:bg-sky-600 hover:text-white transition duration-300"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-sky-500 rounded-full shadow-md hover:bg-sky-600 hover:text-white transition duration-300"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-sky-500 rounded-full shadow-md hover:bg-sky-600 hover:text-white transition duration-300"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-sky-500 rounded-full shadow-md hover:bg-sky-600 hover:text-white transition duration-300"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-sky-600/90 py-4">
                <p className="text-center text-sm font-medium">
                    © {new Date().getFullYear()} Tecsup. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
