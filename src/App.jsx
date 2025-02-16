import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './App.css'

function App() {
  const [currencies, setCurrencies] = useState({})
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : ['EUR', 'TRY']
  })
  const [historicalData, setHistoricalData] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : true
  })

  const allCurrencies = [
    'USD', 'EUR', 'GBP', 'TRY', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR',
    'NZD', 'BRL', 'ZAR', 'SGD', 'HKD'
  ]

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://v6.exchangerate-api.com/v6/894b366769043adc094e4cc1/latest/${baseCurrency}`)
        const data = await response.json()
        
        if (data.result === 'success') {
          setCurrencies(data.conversion_rates)
          // Son 7 günlük veri simülasyonu
          const simulatedData = Array.from({ length: 7 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - i)
            return {
              date: date.toLocaleDateString(),
              rate: data.conversion_rates['EUR'] * (1 + (Math.random() - 0.5) * 0.1)
            }
          }).reverse()
          setHistoricalData(simulatedData)
        } else {
          setError('Döviz kurları alınamadı')
        }
      } catch (err) {
        setError('Bir hata oluştu: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRates()
  }, [baseCurrency])

  const toggleFavorite = (currency) => {
    setFavorites(prev => 
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Döviz Kuru Uygulaması
          </h1>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {darkMode ? '☀️ Açık Mod' : '🌙 Koyu Mod'}
          </button>
        </div>

        <div className={`rounded-lg shadow-lg p-6 `}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel - Para Birimi Seçimi ve Favoriler */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Baz Para Birimi:</label>
                <select 
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {allCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-bold mb-2">Favori Para Birimleri</h3>
                <div className="space-y-2">
                  {allCurrencies.map(currency => (
                    <button
                      key={currency}
                      onClick={() => toggleFavorite(currency)}
                      className={`flex items-center justify-between w-full p-2 rounded ${
                        darkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{currency}</span>
                      {favorites.includes(currency) ? (
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <StarIconOutline className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Orta Panel - Grafik */}
            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4">Son 7 Günlük EUR/USD Değişimi</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="date" 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <YAxis 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? '#1F2937' : 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: darkMode ? 'white' : 'black'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Favori Kurlar Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map(currency => (
                  currency !== baseCurrency && (
                    <div 
                      key={currency} 
                      className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{currency}</h3>
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                      </div>
                      <p className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {currencies[currency]?.toFixed(4)}
                      </p>
                      <p className="text-sm opacity-75">
                        1 {baseCurrency} = {currencies[currency]?.toFixed(4)} {currency}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
