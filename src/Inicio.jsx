import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

const drivers = [
  {
    initials: "C",
    name: "Carlos Muñoz",
    type: "motocarro",
    vehicle: "MotoCarro · ABC-123",
    license: "MotoCarro - ABC-123",
    rating: "4.8",
    zone: "7 de Agosto",
    status: "Disponible",
    telefono: "+573123456789",
  },
  {
    initials: "M",
    name: "María López",
    type: "moto",
    vehicle: "moto · DEF-456",
    license: "moto - DEF-456",
    rating: "4.9",
    zone: "Piedras Blancas",
    status: "Disponible",
    telefono: "+573123456789",
  },
  {
    initials: "J",
    name: "José Restrepo",
    type: "moto",
    vehicle: "moto · GHI-789",
    license: "moto - GHI-789",
    rating: "4.7",
    zone: "Santa Bárbara",
    status: "Disponible",
    telefono: "+573123456789",
  },
  {
    initials: "A",
    name: "Ana García",
    type: "motocarro",
    vehicle: "motocarro · JKL-012",
    license: "motocarro - JKL-012",
    rating: "5.0",
    zone: "7 de Agosto",
    status: "Disponible",
    telefono: "+573123456789",
  },
];

const valores = [
  {
    icon: "⚡",
    title: "Rápido y fácil",
    description:
      "Encuentra conductores disponibles en tu zona en segundos. Sin complicaciones.",
  },
  {
    icon: "🛡️",
    title: "Seguro y confiable",
    description:
      "Todos los conductores están verificados. Viaja tranquilo por Remedios.",
  },
  {
    icon: "🤝",
    title: "Proyecto comunitario",
    description:
      "Facilitamos el transporte urbano conectando usuarios y conductores de forma accesible.",
  },
];

const team = [
  { initials: "SR", name: "Stefania Rojo", role: "Desarrolladora" },
  { initials: "MA", name: "Mariana Alvarez", role: "Desarrolladora" },
  { initials: "RT", name: "Richard Tabares", role: "Instructor" },
];

const zonas = ["Piedras Blancas", "Santa Bárbara", "7 de Agosto"];

function Inicio() {
  const [vehicleType, setVehicleType] = useState("moto");
  const [zone, setZone] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openContactIndex, setOpenContactIndex] = useState(-1);

  // Estados del formulario de contacto
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(""); // "success" o "error"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init("bgu3UATObJwJcrdwy");
  }, []);

  const vehicleTypeMap = {
    moto: "moto",
    motocarro: "motocarro",
  };

  const updateResults = (selectedVehicle, selectedZone) => {
    const filtered = drivers.filter(
      (driver) =>
        driver.status === "Disponible" &&
        driver.type === selectedVehicle &&
        (selectedZone === "" || driver.zone === selectedZone),
    );
    setSearchResults(filtered);
  };

  const handleVehicleChange = (type) => {
    setVehicleType(type);
  };

  const handleZoneChange = (value) => {
    setZone(value);
  };

  const handleSearch = () => {
    if (!zone) {
      setHasSearched(true);
      setErrorMessage("Por favor selecciona una zona para buscar");
      setSearchResults([]);
      return;
    }
    setErrorMessage("");
    setHasSearched(true);
    updateResults(vehicleType, zone);
  };

  // Funciones para el formulario de contacto
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) {
      errors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "El correo no es válido";
    }
    if (!formData.message.trim()) errors.message = "El mensaje es obligatorio";
    return errors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("");

    // Validar
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar con EmailJS
      await emailjs.send(
        "service_afs07df",
        "template_ru9snlc",
        {
          to_email: "stefa.des9@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
      );

      // Éxito
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => setFormStatus(""), 5000);
    } catch (error) {
      console.error("Error al enviar:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-800/30 bg-slate-900 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 shadow-sm">
              <img
                src="/logo.png"
                alt="Tu Ruta Fácil"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-base font-bold text-slate-100">
                Tu Ruta Fácil
              </p>
              <p className="text-xs text-slate-300">
                Encuentra tu conductor en segundos
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 md:flex">
            <a
              href="#inicio"
              className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-100 transition duration-200 hover:bg-orange-500/15 hover:text-orange-100"
            >
              Inicio
            </a>
            <a
              href="#contacto"
              className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-100 transition duration-200 hover:bg-orange-500/15 hover:text-orange-100"
            >
              Contacto
            </a>
            <a
              href="#acerca"
              className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-100 transition duration-200 hover:bg-orange-500/15 hover:text-orange-100"
            >
              Acerca De
            </a>
          </nav>
        </div>
      </header>

      <main className="space-y-20">
        <section id="inicio" className="relative overflow-hidden min-h-[80vh]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/fondo-remedios.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/70" />
          <div className="mx-auto relative z-10 max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex min-h-[62vh] flex-col items-center justify-center gap-10">
              <div className="max-w-3xl text-center text-white">
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Encuentra tu conductor
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-orange-100/90 sm:text-xl">
                  Selecciona el tipo de vehículo y tu zona para encontrar
                  conductores disponibles en tu comunidad de Remedios.
                </p>
              </div>
              <div className="w-full max-w-xl rounded-4xl border border-white/15 bg-white/95 p-8 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Tipo de vehículo
                    </p>
                    <div className="mt-4 flex gap-3">
                      {["moto", "motocarro"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleVehicleChange(type)}
                          className={`flex-1 rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                            vehicleType === type
                              ? "border-orange-500 bg-orange-50 text-slate-900 shadow-sm"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {type === "moto" ? "🏍️" : "🚚"}
                            </span>
                            <span className="uppercase">
                              {type === "moto" ? "Moto" : "Motocarro"}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="zone"
                      className="text-sm font-semibold text-slate-600"
                    >
                      Zona de recogida
                    </label>
                    <select
                      id="zone"
                      value={zone}
                      onChange={(event) => handleZoneChange(event.target.value)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    >
                      <option value="">Selecciona tu zona...</option>
                      {zonas.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {hasSearched && (
                    <div
                      className={`rounded-3xl border p-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${
                        errorMessage
                          ? "border-red-200 bg-red-50"
                          : "border-slate-200 bg-linear-to-br from-slate-50 to-white"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold uppercase tracking-[0.22em] ${
                          errorMessage ? "text-red-600" : "text-slate-500"
                        }`}
                      >
                        {errorMessage
                          ? "Error de búsqueda"
                          : "Resultados disponibles"}
                      </p>

                      {errorMessage ? (
                        <p className="mt-2 text-lg font-semibold text-red-700">
                          {errorMessage}
                        </p>
                      ) : (
                        <>
                          {/* Tarjeta de Contador */}
                          <div className="mt-4 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 p-4 shadow-lg shadow-orange-500/20">
                            <p className="text-sm text-orange-50">
                              Conductores disponibles en {zone}
                            </p>
                            <p className="mt-1 text-3xl font-bold text-white">
                              {searchResults.length}
                            </p>
                          </div>

                          {/* Lista de Conductores */}
                          {searchResults.length > 0 ? (
                            <div className="mt-6 space-y-3">
                              {searchResults.map((driver, index) => (
                                <div
                                  key={driver.name}
                                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-orange-300 hover:scale-[1.02] cursor-pointer animate-in fade-in slide-in-from-left-4"
                                  style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: "both",
                                  }}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    {/* Avatar y Info Principal */}
                                    <div className="flex flex-1 items-start gap-4">
                                      {/* Avatar */}
                                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-orange-600 text-lg font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                                        {driver.initials}
                                      </div>

                                      {/* Información del Conductor */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <p className="font-semibold text-slate-900">
                                            {driver.name}
                                          </p>
                                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                                            <span>⭐</span>
                                            <span>{driver.rating}</span>
                                          </span>
                                        </div>

                                        {/* Vehículo */}
                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                          <span className="text-lg">
                                            {driver.type === "moto"
                                              ? "🏍️"
                                              : "🚚"}
                                          </span>
                                          <span>{driver.vehicle}</span>
                                        </div>

                                        {/* Ubicación */}
                                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                          <span className="text-lg">📍</span>
                                          <span>{driver.zone}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Estado Disponible */}
                                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                                      <span className="text-lg">✅</span>
                                      <span>{driver.status}</span>
                                    </div>
                                  </div>

                                  {/* Línea divisoria sutil */}
                                  <div className="mt-4 border-t border-slate-100" />

                                  <div className="mt-4 relative">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenContactIndex(
                                          openContactIndex === index ? -1 : index,
                                        )
                                      }
                                      className="w-full rounded-xl border border-orange-400 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm transition-all duration-200 hover:bg-orange-100 hover:shadow-md"
                                    >
                                      Contactar conductor
                                    </button>

                                    <div
                                      className={`absolute right-0 left-0 top-full z-10 mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                                        openContactIndex === index
                                          ? "visible opacity-100 scale-100"
                                          : "invisible opacity-0 scale-95"
                                      }`}
                                    >
                                      <a
                                        href={`tel:${driver.telefono}`}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                                      >
                                        <span className="text-lg">📞</span>
                                        Llamar
                                      </a>
                                      <a
                                        href={`https://wa.me/${driver.telefono.replace(
                                          /\D/g,
                                          "",
                                        )}?text=Hola,%20te%20encontr%C3%A9%20en%20Tu%20Ruta%20F%C3%A1cil`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                                      >
                                        <span className="text-lg">💬</span>
                                        WhatsApp
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                              <p className="text-3xl">😕</p>
                              <p className="mt-3 text-sm font-semibold text-slate-600">
                                No encontramos conductores disponibles en esta
                                zona.
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                Intenta nuevamente más tarde o selecciona otra
                                zona.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleSearch}
                    className="w-full rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                ¿Por qué Tu Ruta Fácil?
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Propuesta clara para tu viaje
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {valores.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-100 bg-white p-8 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-500">
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="acerca" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
            <div className="space-y-6 rounded-4xl bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div className="rounded-[28px] border border-slate-100 bg-linear-to-br from-orange-50/95 via-white to-slate-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4">
                    <div className="h-0.5 w-12 rounded-full bg-orange-200 mb-4 mx-auto" />
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <p className="font-semibold text-slate-900 text-lg">
                        Nuestra Misión
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Facilitar el transporte urbano en Remedios, Antioquia,
                    conectando pasajeros con conductores verificados de manera
                    rápida, segura y accesible para toda la comunidad.
                  </p>
                </div>

                <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4">
                    <div className="h-0.5 w-12 rounded-full bg-slate-300/40 mb-4 mx-auto" />
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
                        <span className="text-2xl">🔭</span>
                      </div>
                      <p className="font-semibold text-slate-900 text-lg">
                        Nuestra Visión
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Ser la plataforma de transporte comunitario referente en los
                    municipios de Antioquia, promoviendo la movilidad eficiente
                    y la economía local.
                  </p>
                </div>
              </div>
              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-center text-base font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Nuestros Valores
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {valores.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl bg-white p-6 text-center shadow-sm border border-slate-100 transition hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <p className="mt-4 font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-base font-semibold text-slate-900">
                  Nuestro Equipo
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {team.map((member) => (
                    <div
                      key={member.name}
                      className="group rounded-3xl bg-slate-50 p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white ring-2 ring-white/10">
                        {member.initials}
                      </div>
                      <p className="font-semibold text-slate-900 text-lg">
                        {member.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Tu Ruta Fácil
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  Proyecto académico – Remedios 2026
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  © Todos los derechos reservados
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-slate-900 text-slate-100">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.5)]">
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">
                  Contáctanos
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  Estamos aquí para ayudarte
                </h2>
                <p className="mt-3 text-sm text-slate-300">
                  Escríbenos y un equipo local responderá tus dudas sobre rutas
                  y conductores.
                </p>
              </div>
              <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
                <div className="space-y-4 rounded-[28px] bg-slate-950/90 p-6">
                  <div className="rounded-3xl bg-slate-900 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-xl text-orange-300">📞</div>
                      <div>
                        <p className="font-semibold text-slate-100">Teléfono</p>
                        <p className="mt-2 text-sm text-slate-400">
                          300 675 1761
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-900 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-xl text-orange-300">✉️</div>
                      <div>
                        <p className="font-semibold text-slate-100">Correo</p>
                        <p className="mt-2 text-sm text-slate-400">
                          stefa.des9@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-900 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-xl text-orange-300">📍</div>
                      <div>
                        <p className="font-semibold text-slate-100">Ubicación</p>
                        <p className="mt-2 text-sm text-slate-400">
                          Remedios, Antioquia, Colombia
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-900 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-xl text-orange-300">⏰</div>
                      <div>
                        <p className="font-semibold text-slate-100">Horario</p>
                        <p className="mt-2 text-sm text-slate-400">
                          Lunes a Sábado · 6:00 AM - 8:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/573006751761?text=Hola,%20encontr%C3%A9%20Tu%20Ruta%20F%C3%A1cil%20y%20deseo%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20servicio."
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    <span>💬</span>
                    Escríbenos por WhatsApp
                  </a>
                </div>
                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4 rounded-[28px] bg-slate-950/90 p-6">
                  {/* Mensaje de éxito */}
                  {formStatus === "success" && (
                    <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-300">✅ Tu mensaje fue enviado correctamente.</p>
                    </div>
                  )}

                  {/* Mensaje de error */}
                  {formStatus === "error" && (
                    <div className="rounded-2xl border border-red-400/50 bg-red-500/10 p-4">
                      <p className="text-sm font-semibold text-red-300">❌ Hubo un error al enviar tu mensaje. Intenta nuevamente.</p>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Tu nombre completo"
                      className={`w-full rounded-2xl border bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-300/30"
                          : "border-slate-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/30"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Correo
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="correo@ejemplo.com"
                      className={`w-full rounded-2xl border bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-300/30"
                          : "border-slate-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/30"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="¿En qué podemos ayudarte?"
                      className={`w-full rounded-2xl border bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition ${
                        formErrors.message
                          ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-300/30"
                          : "border-slate-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/30"
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Inicio;
