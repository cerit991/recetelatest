import React from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import { Clock, Users, ChefHat, Scale, Thermometer, UtensilsCrossed, Award } from 'lucide-react';

const RecipeDetail = ({ recipe }) => {
  const router = useRouter();

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-neutral-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="text-orange-500 mb-4">
            <UtensilsCrossed className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tarif Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Aradığınız tarif mevcut değil.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-neutral-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center gap-3 mb-4">
                <ChefHat className="w-8 h-8" />
                <h1 className="text-4xl font-bold">{recipe.name}</h1>
              </div>
              <p className="text-lg opacity-90">{recipe.chef}</p>
            </div>

            <div className="p-8">
              {recipe.image && <img src={recipe.image} alt="Recipe Image" className="mb-8 rounded-xl" />}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-orange-50/50 rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                    <Clock className="w-6 h-6 text-orange-500" />
                    Tarif Detayları
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600">Hazırlık Süresi</span>
                      </div>
                      <span className="font-medium text-gray-900">{recipe.prepTime}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <UtensilsCrossed className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600">Pişirme Süresi</span>
                      </div>
                      <span className="font-medium text-gray-900">{recipe.cookTime}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600">Porsiyon</span>
                      </div>
                      <span className="font-medium text-gray-900">{recipe.servings} Kişilik</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Scale className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600">Zorluk</span>
                      </div>
                      <span className="font-medium text-gray-900">{recipe.difficulty}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600">Sıcaklık</span>
                      </div>
                      <span className="font-medium text-gray-900">{recipe.temperature}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600">Kategori</span>
                      </div>
                      <span className="font-medium text-gray-900">{recipe.category}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                    <Award className="w-6 h-6 text-orange-500" />
                    Malzemeler
                  </h2>
                  <div className="grid gap-3">
                    {recipe.ingredients.split('\n').map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-gray-600">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

export async function getServerSideProps(context) {
  const { name } = context.params;
  const dataDir = path.join(process.cwd(), 'public/data');
  const filePath = path.join(dataDir, `${name}.json`);

  if (!fs.existsSync(filePath)) {
    return {
      notFound: true,
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const recipe = JSON.parse(fileContents);

  return {
    props: {
      recipe,
    },
  };
}