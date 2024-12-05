import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Clock, Users, ChefHat, Scale, Thermometer, UtensilsCrossed, Award, Tags, Image } from 'lucide-react';

const Recete = () => {
  const [name, setName] = useState('');
  const [chef, setChef] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [temperature, setTemperature] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/createrecete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients, image }),
    });
    if (response.ok) {
      setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 2000);
    } else {
      setLoading(false);
      alert('Recete oluşturulamadı.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-neutral-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Yeni Tarif Oluştur</h1>
          <p className="mt-3 text-lg text-gray-600">Mutfağınızdan yeni lezzetler paylaşın</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
            <p className="text-lg text-gray-600">Tarif oluşturuluyor...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-orange-500 to-orange-600">
              <div className="flex items-center gap-3 text-white mb-1">
                <ChefHat className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Temel Bilgiler</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <UtensilsCrossed className="w-5 h-5 text-orange-500" />
                      Tarif Adı
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                      placeholder="Örn: İtalyan Usulü Makarna"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <ChefHat className="w-5 h-5 text-orange-500" />
                      Şef
                    </label>
                    <input
                      type="text"
                      value={chef}
                      onChange={(e) => setChef(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                      placeholder="Örn: Şef Mehmet Yalçın"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Hazırlık Süresi
                    </label>
                    <input
                      type="text"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                      placeholder="Örn: 20 dakika"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Pişirme Süresi
                    </label>
                    <input
                      type="text"
                      value={cookTime}
                      onChange={(e) => setCookTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                      placeholder="Örn: 30 dakika"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <Users className="w-5 h-5 text-orange-500" />
                      Porsiyon
                    </label>
                    <input
                      type="text"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                      placeholder="Örn: 4 kişilik"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <Scale className="w-5 h-5 text-orange-500" />
                      Zorluk Seviyesi
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Kolay">Kolay</option>
                      <option value="Orta">Orta</option>
                      <option value="Zor">Zor</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <Thermometer className="w-5 h-5 text-orange-500" />
                      Pişirme Sıcaklığı
                    </label>
                    <input
                      type="text"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                      placeholder="Örn: 180°C"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <Tags className="w-5 h-5 text-orange-500" />
                      Kategori
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Ana Yemek">Ana Yemek</option>
                      <option value="Çorba">Çorba</option>
                      <option value="Salata">Salata</option>
                      <option value="Tatlı">Tatlı</option>
                      <option value="Aperatif">Aperatif</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Malzemeler
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                  placeholder="Her bir malzemeyi yeni bir satıra yazın..."
                />
              </div>

              <div className="mt-8">
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Image className="w-5 h-5 text-orange-500" />
                  Görsel
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                />
                {image && <img src={image} alt="Recipe Image" className="mt-4 rounded-xl" />}
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Geri Dön
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
                >
                  Tarifi Oluştur
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Recete;