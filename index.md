---
layout: default
---

<section>
  <p class="text-gray-500 mb-6">Nội dung đang được cập nhật liên tục. Chọn một phần để bắt đầu đọc:</p>

  <div id="ktContinueReading" class="mb-6 p-3 bg-blue-50 hidden">
    Bạn đang đọc dở chương <b class="ktChapterName"></b>
    <a class="ktChapterLink block underline text-blue-800">Đọc tiếp</a>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {% for book in site.data.books %}
      {% assign chapters = 0 %}
      {% assign firstChapterUrl = nil %}

      {% for chapter in site.bible %}
        {% if chapter.url contains book.slug %}
          {% assign chapters = chapters | plus: 1 %}

          {% unless firstChapterUrl %}
            {% assign firstChapterUrl = chapter.url %}
          {% endunless %}
        {% endif %}
      {% endfor %}

      <a class="block border hover:border-blue-800 rounded-xl p-3 py-2 hover:shadow transition group"
         href="{{ firstChapterUrl | relative_url }}">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">{{ forloop.index }}. {{ book.name }}</div>
            <div class="text-xs text-gray-500">{{ chapters }} chương</div>
          </div>
          <div class="hidden group-hover:block group-hover:text-blue-800">→</div>
        </div>
      </a>
    {% endfor %}
  </div>
</section>

<script defer>
  (function() {
    const books = {{ site.data.books | jsonify }}

    const chapters = [
      {% for c in site.bible %}
        {
          url: '{{ c.url }}',
          title: '{{ c.title }}',
        }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]

    const $continueReading = document.getElementById('ktContinueReading')
    const lastChapterUrl = localStorage.getItem('ktLastChapterUrl')

    const chapter = chapters.find(c => c.url == lastChapterUrl)

    if (chapter) {
        const book = books.find(b => chapter.url.includes(`/${b.slug}/`))

        let chapterIndex = 0
        for (const c of chapters) {
          if (c.url.includes(`/${book.slug}/`)) chapterIndex++
          if (c.url == chapter.url) break
        }

        $continueReading.querySelector('.ktChapterName').innerText = `${book.name} - ${chapterIndex}. ${chapter.title}`
        $continueReading.querySelector('.ktChapterLink').href = chapter.url
        $continueReading.classList.remove('hidden')
    }
  })()
</script>