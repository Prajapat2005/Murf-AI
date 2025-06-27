import { Card, CardContent } from "@/components/ui/card"

export default function InstructionsCard() {
  const steps = [
    { icon: "🌐", text: "Select your source and target languages" },
    { icon: "🎤", text: "Choose your preferred voice for translation playback" },
    { icon: "🔴", text: "Click the microphone button and start speaking" },
    { icon: "🔄", text: "Your speech will be automatically translated" },
    { icon: "🔊", text: "Click 'Play Translation' to hear the result in your selected voice" },
  ]

  return (
    <Card className="shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 translate-y-0 opacity-100 bg-gray-800 border border-gray-600">
      <CardContent className="pt-8 pb-6">
        <div className="text-center space-y-6">
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            💡 How to use Voice Translator
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl mb-2 animate-bounce" style={{ animationDelay: `${index * 100}ms` }}>
                    {step.icon}
                  </div>
                  <p className="text-sm text-gray-200 font-medium leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600">
            <p className="text-sm text-gray-300 italic">
              ✨ Experience seamless real-time translation with beautiful voice synthesis
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
