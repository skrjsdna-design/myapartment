/**
 * MBTI Quiz Web Component with Multi-language Support
 */
class MBTIQuiz extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentStep = -1; // -1 means language selection screen
    this.language = 'en';
    this.answers = { ei: '', sn: '', tf: '', jp: '' };

    this.translations = {
      en: {
        selectLang: 'Choose your language',
        question: 'Question',
        of: 'of',
        resultTitle: 'Your personality type!',
        resultDesc: 'This is a simplified result based on your answers. Each type has unique strengths and ways of seeing the world.',
        restart: 'Take it again',
        questions: [
          {
            id: 'ei',
            text: 'After a long week, how do you prefer to recharge?',
            options: [
              { label: 'Going out with friends and meeting new people', value: 'E' },
              { label: 'Having some quiet time alone or with a close friend', value: 'I' }
            ]
          },
          {
            id: 'sn',
            text: 'When learning something new, what usually catches your attention?',
            options: [
              { label: 'Facts, details, and practical applications', value: 'S' },
              { label: 'Ideas, possibilities, and the big picture', value: 'N' }
            ]
          },
          {
            id: 'tf',
            text: 'When making a difficult decision, what matters more to you?',
            options: [
              { label: 'Logic, consistency, and objective analysis', value: 'T' },
              { label: 'People, values, and the impact on others', value: 'F' }
            ]
          },
          {
            id: 'jp',
            text: 'How do you prefer to approach your daily tasks or projects?',
            options: [
              { label: 'Planning ahead and following a clear schedule', value: 'J' },
              { label: 'Being spontaneous and keeping options open', value: 'P' }
            ]
          }
        ]
      },
      ko: {
        selectLang: '언어를 선택하세요',
        question: '질문',
        of: '/',
        resultTitle: '당신의 성격 유형은!',
        resultDesc: '당신의 답변을 바탕으로 한 간단한 결과입니다. 각 유형은 독특한 강점과 세상을 바라보는 방식을 가지고 있습니다.',
        restart: '다시 하기',
        questions: [
          {
            id: 'ei',
            text: '긴 일주일이 끝난 후, 어떻게 에너지를 충전하시겠어요?',
            options: [
              { label: '친구들과 밖으로 나가 새로운 사람들을 만난다', value: 'E' },
              { label: '혼자서 조용한 시간을 보내거나 친한 친구를 만난다', value: 'I' }
            ]
          },
          {
            id: 'sn',
            text: '새로운 것을 배울 때, 보통 무엇에 더 주의를 기울이시나요?',
            options: [
              { label: '사실, 구체적인 세부 사항, 실제 적용 사례', value: 'S' },
              { label: '아이디어, 가능성, 전체적인 큰 그림', value: 'N' }
            ]
          },
          {
            id: 'tf',
            text: '어려운 결정을 내려야 할 때, 무엇이 더 중요하다고 생각하시나요?',
            options: [
              { label: '논리, 일관성, 객관적인 분석', value: 'T' },
              { label: '사람들, 가치관, 타인에게 미칠 영향', value: 'F' }
            ]
          },
          {
            id: 'jp',
            text: '매일 하는 일이나 프로젝트를 어떤 방식으로 처리하는 것을 선호하시나요?',
            options: [
              { label: '미리 계획을 세우고 정해진 일정에 따른다', value: 'J' },
              { label: '그때그때 마음 가는 대로 하고 선택의 여지를 남겨둔다', value: 'P' }
            ]
          }
        ]
      },
      ja: {
        selectLang: '言語を選択してください',
        question: '質問',
        of: '/',
        resultTitle: 'あなたの性格タイプ！',
        resultDesc: '回答に基づいた簡易的な結果です。それぞれのタイプには独自の強みと世界の見方があります。',
        restart: 'もう一度受ける',
        questions: [
          {
            id: 'ei',
            text: '忙しい一週間が終わった後、どのようにリフレッシュしたいですか？',
            options: [
              { label: '友達と外出して新しい人々に会う', value: 'E' },
              { label: '一人で静かな時間を過ごすか、親しい友人と会う', value: 'I' }
            ]
          },
          {
            id: 'sn',
            text: '新しいことを学ぶとき、通常どのようなことに注目しますか？',
            options: [
              { label: '事実、詳細、そして実用的な応用', value: 'S' },
              { label: 'アイデア、可能性、そして全体像', value: 'N' }
            ]
          },
          {
            id: 'tf',
            text: '難しい決断をするとき、どちらをより重視しますか？',
            options: [
              { label: '論理、一貫性、そして客観的な分析', value: 'T' },
              { label: '人々、価値観、そして他者への影響', value: 'F' }
            ]
          },
          {
            id: 'jp',
            text: '日々の仕事やプロジェクトにどのように取り組むのが好きですか？',
            options: [
              { label: '事前に計画を立て、明確なスケジュールに従う', value: 'J' },
              { label: '自発的に行動し、選択肢を広げておく', value: 'P' }
            ]
          }
        ]
      },
      es: {
        selectLang: 'Elige tu idioma',
        question: 'Pregunta',
        of: 'de',
        resultTitle: '¡Tu tipo de personalidad!',
        resultDesc: 'Este es un resultado simplificado basado en tus respuestas. Cada tipo tiene fortalezas únicas y formas de ver el mundo.',
        restart: 'Hacerlo de nuevo',
        questions: [
          {
            id: 'ei',
            text: 'Después de una semana larga, ¿cómo prefieres recargar energías?',
            options: [
              { label: 'Saliendo con amigos y conociendo gente nueva', value: 'E' },
              { label: 'Pasando tiempo tranquilo solo o con un amigo cercano', value: 'I' }
            ]
          },
          {
            id: 'sn',
            text: 'Al aprender algo nuevo, ¿qué suele captar tu atención?',
            options: [
              { label: 'Hechos, detalles y aplicaciones prácticas', value: 'S' },
              { label: 'Ideas, posibilidades y el panorama general', value: 'N' }
            ]
          },
          {
            id: 'tf',
            text: 'Al tomar una decisión difícil, ¿qué te importa más?',
            options: [
              { label: 'Lógica, consistencia y análisis objetivo', value: 'T' },
              { label: 'Personas, valores y el impacto en los demás', value: 'F' }
            ]
          },
          {
            id: 'jp',
            text: '¿Cómo prefieres abordar tus tareas diarias o proyectos?',
            options: [
              { label: 'Planificando con antelación y siguiendo un horario claro', value: 'J' },
              { label: 'Siendo espontáneo y manteniendo las opciones abiertas', value: 'P' }
            ]
          }
        ]
      }
    };
  }

  connectedCallback() {
    this.render();
  }

  setLanguage(lang) {
    this.language = lang;
    this.currentStep = 0;
    this.render();
  }

  handleAnswer(dimension, value) {
    this.answers[dimension] = value;
    const t = this.translations[this.language];
    if (this.currentStep < t.questions.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.showResult();
    }
  }

  showResult() {
    const result = `${this.answers.ei}${this.answers.sn}${this.answers.tf}${this.answers.jp}`;
    this.renderResult(result);
  }

  render() {
    if (this.currentStep === -1) {
      this.renderLanguageSelection();
      return;
    }

    const t = this.translations[this.language];
    const q = t.questions[this.currentStep];
    
    this.shadowRoot.innerHTML = `
      ${this.getCommonStyles()}
      <div class="progress">
        <span>${t.question} ${this.currentStep + 1} ${t.of} ${t.questions.length}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${((this.currentStep) / t.questions.length) * 100}%"></div>
        </div>
      </div>
      <h2>${q.text}</h2>
      <div class="options">
        ${q.options.map(opt => `
          <button onclick="this.getRootNode().host.handleAnswer('${q.id}', '${opt.value}')">
            ${opt.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  renderLanguageSelection() {
    this.shadowRoot.innerHTML = `
      ${this.getCommonStyles()}
      <style>
        .lang-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        .lang-btn {
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          text-align: center;
        }
        .lang-btn span:first-child {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
      </style>
      <h2 style="text-align: center;">Choose your language</h2>
      <div class="lang-grid">
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('en')">
          <span>🇺🇸</span>
          <span>English</span>
        </button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('ko')">
          <span>🇰🇷</span>
          <span>한국어</span>
        </button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('ja')">
          <span>🇯🇵</span>
          <span>日本語</span>
        </button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('es')">
          <span>🇪🇸</span>
          <span>Español</span>
        </button>
      </div>
    `;
  }

  renderResult(result) {
    const t = this.translations[this.language];
    this.shadowRoot.innerHTML = `
      ${this.getCommonStyles()}
      <style>
        :host { text-align: center; animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .result-badge {
          display: inline-block;
          background: oklch(0.65 0.25 260);
          color: white;
          font-size: 3rem;
          font-weight: 800;
          padding: 1rem 2rem;
          border-radius: 24px;
          margin-bottom: 2rem;
          box-shadow: 0 20px 40px -10px oklch(0.65 0.25 260 / 0.4);
        }
        .restart-btn {
          background: #111;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .restart-btn:hover { background: #333; transform: scale(1.05); }
      </style>
      <div class="result-badge">${result}</div>
      <h2>${t.resultTitle}</h2>
      <p style="color: #64748b; margin-bottom: 2.5rem; line-height: 1.6;">${t.resultDesc}</p>
      <button class="restart-btn" onclick="location.reload()">${t.restart}</button>
    `;
  }

  getCommonStyles() {
    return `
      <style>
        :host {
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 600px;
          margin: 2rem auto;
          background: var(--card-bg, #ffffff);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .progress {
          margin-bottom: 2rem;
          font-size: 0.875rem;
          color: #666;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-bar {
          height: 6px;
          background: #eee;
          border-radius: 3px;
          flex-grow: 1;
          margin: 0 1rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-color, #6366f1);
          transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 2rem;
          line-height: 1.4;
          text-align: center;
        }

        .options {
          display: grid;
          gap: 1rem;
        }

        button {
          background: #f8fafc;
          border: 2px solid transparent;
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          text-align: center;
          font-size: 1rem;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }
      </style>
    `;
  }
}

customElements.define('mbti-quiz', MBTIQuiz);
