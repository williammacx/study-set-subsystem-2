<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quizoodle</title>
    <!-- Tailwind via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50">
    <header class="bg-white border-b border-gray-200 py-5 px-6">
      <p class="text-2xl font-bold text-indigo-600">Quizoodle</p>
    </header>
    
    <div class="max-w-6xl mx-auto px-4 py-8">
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📚</span> Study Sets
        </h1>
        <div class="text-gray-600 text-lg mb-6">
          Browse flashcards and study materials created by the Quizoodle community
        </div>
        <div class="flex gap-4">
          <div class="bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm">
            <strong class="text-2xl font-bold text-indigo-600 block">{{ study_sets|length }}</strong>
            <span class="text-gray-600 text-sm">Total Study Sets</span>
          </div>
          <div class="bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm">
            <strong class="text-2xl font-bold text-indigo-600 block">0</strong>
            <span class="text-gray-600 text-sm">Public</span>
          </div>
        </div>
      </header>
      
      <div class="bg-white rounded-lg border border-gray-200 p-5 mb-8 flex flex-wrap items-center gap-4">
        <span class="text-gray-700 font-medium flex items-center gap-2">
          <span>🔍</span> Filter by visibility:
        </span>
        <form method="GET" action="/" class="flex items-center gap-3">
          <select name="visibility" onchange="this.form.submit()" class="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all" {% if current_filter == 'all' %}selected{% endif %}>All Study Sets</option>
          </select>
          {% if current_filter != 'all' %}
          <a href="/" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Clear Filter
          </a>
          {% endif %}
        </form>
      </div>
      
      {% if study_sets %}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {% for study_set in study_sets %}
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div class="border-b border-gray-100 px-6 py-4">
            <div class="text-lg font-semibold text-gray-900">{{ study_set[0] }}</div>
          </div>
          
          <div class="p-6 flex-grow">
            <div class="text-gray-700 mb-4 leading-relaxed">
              {{ study_set[1] if study_set[1] else 'No description provided' }}
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2 text-gray-600">
                <span class="text-gray-500">👤</span>
                Created by: <span class="font-medium text-gray-900">{{ study_set[2] if study_set[2] else 'Unknown' }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span class="text-gray-500">📅</span>
                Created: <span class="font-medium text-gray-900">{{ study_set[3].strftime('%b %d, %Y') if study_set[3] else 'Unknown' }}</span>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-100 px-6 py-4">
            <a href="/study-set/{{ loop.index0 }}" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              View Study Set 
              <span class="ml-1 text-lg">→</span>
            </a>
          </div>
        </div>
        {% endfor %}
      </div>
      {% else %}
      <div class="text-center py-16 bg-white rounded-lg border border-gray-200 mb-12">
        <div class="text-7xl mb-4">📭</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">No study sets found</h2>
        <p class="text-gray-600">Try adjusting your filter or check back later for new content.</p>
      </div>
      {% endif %}
      
      <div class="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        Quizoodle Study Sets • Data current as of {{ now().strftime('%Y-%m-%d %H:%M') if now else '' }}
      </div>
    </div>
  </body>
</html>