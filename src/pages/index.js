import React from 'react'
import { Clock, Users, ChefHat, Scale, Thermometer, Search, Edit, Trash } from 'lucide-react'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'

const RecipePage = ({ initialRecipes }) => {
  const router = useRouter()

  const handleViewRecipe = (name) => {
    router.push(`/recete/${name}`)
  }

  const handleEditRecipe = (name) => {
    router.push(`/recete/edit/${name}`)
  }

  const handleDeleteRecipe = async (name) => {
    const confirmed = confirm(`Are you sure you want to delete the recipe: ${name}?`)
    if (confirmed) {
      const response = await fetch(`/api/deleterecete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      if (response.ok) {
        router.reload()
      } else {
        alert('Failed to delete the recipe.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-neutral-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Mutfak Reçeteleri</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Reçete ara..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <button
            onClick={() => router.push('/mkdirrecete')}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Reçete Oluştur
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialRecipes.map((recipe) => (
            <div key={recipe.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-600">{recipe.chef || 'Şef Bilgisi Yok'}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">{recipe.name}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Hazırlık: {recipe.prepTime || 'Bilinmiyor'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{recipe.temperature || 'Bilinmiyor'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{recipe.servings || 'Bilinmiyor'} Kişilik</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{recipe.difficulty || 'Bilinmiyor'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewRecipe(recipe.name)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Tarifi Görüntüle
                  </button>
                  <button
                    onClick={() => handleEditRecipe(recipe.name)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <Edit className="inline-block w-5 h-5 mr-1" /> Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.name)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <Trash className="inline-block w-5 h-5 mr-1" /> Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipePage

export async function getServerSideProps() {
  const dataDir = path.join(process.cwd(), 'public/data')
  const filenames = fs.readdirSync(dataDir)
  const recipes = []

  filenames.forEach((filename) => {
    const filePath = path.join(dataDir, filename)
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const recipe = JSON.parse(fileContents)
      recipes.push(recipe)
    } catch (error) {
      console.error(`Error parsing JSON for file ${filename}:`, error)
    }
  })

  return {
    props: {
      initialRecipes: recipes,
    },
  }
}
