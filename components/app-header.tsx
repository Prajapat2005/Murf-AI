export default function AppHeader() {

  return (
    <div
      className={`text-center space-y-4 transition-all duration-1000 transform  "translate-y-0 opacity-100"
        }`}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Voice Translator
      </h1>

      <p className="text-gray-600 text-lg md:text-xl animate-fade-in-up delay-300">
        Speak in one language, hear it in another
      </p>
      <div className="flex justify-center space-x-2 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  )
}
