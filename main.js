/**
 * MBTI Quiz Web Component
 */
class MBTIQuiz extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentStep = 0;
    this.answers = {
      ei: '',
      sn: '',
      tf: '',
      jp: ''
    };

    this.questions = [
      {
        id: 'ei',
        question: 'After a long week, how do you prefer to recharge?',
        options: [
          { label: 'Going out with friends and meeting new people', value: 'E' },
          { label: 'Having some quiet time alone or with a close friend', value: 'I' }
        ]
      },
      {
        id: 'sn',
        question: 'When learning something new, what usually catches your attention?',
        options: [
          { label: 'Facts, details, and practical applications', value: 'S' },
          { label: 'Ideas, possibilities, and the big picture', value: 'N' }
        ]
      },
      {
        id: 'tf',
        question: 'When making a difficult decision, what matters more to you?',
        options: [
          { label: 'Logic, consistency, and objective analysis', value: 'T' },
          { label: 'People, values, and the impact on others', value: 'F' }
        ]
      },
      {
        id: 'jp',
        question: 'How do you prefer to approach your daily tasks or projects?',
        options: [
          { label: 'Planning ahead and following a clear schedule', value: 'J' },
          { label: 'Being spontaneous and keeping options open', value: 'P' }
        ]
      }
    ];
  }

  connectedCallback() {
    this.render();
  }

  handleAnswer(dimension, value) {
    this.answers[dimension] = value;
    if (this.currentStep < this.questions.length - 1) {
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
    const q = this.questions[this.currentStep];
    this.shadowRoot.innerHTML = `
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
          width: ${((this.currentStep) / this.questions.length) * 100}%;
          transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 2rem;
          line-height: 1.4;
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
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        button:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }

        button::after {
          content: '→';
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.2s ease;
        }

        button:hover::after {
          opacity: 1;
          transform: translateX(0);
        }
      </style>
      <div class="progress">
        <span>Question ${this.currentStep + 1} of ${this.questions.length}</span>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
      <h2>${q.question}</h2>
      <div class="options">
        ${q.options.map(opt => `
          <button onclick="this.getRootNode().host.handleAnswer('${q.id}', '${opt.value}')">
            ${opt.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  renderResult(result) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 600px;
          margin: 2rem auto;
          background: var(--card-bg, #ffffff);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.05);
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

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

        h2 {
          font-size: 2rem;
          color: #111;
          margin-bottom: 1rem;
        }

        p {
          color: #64748b;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
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

        .restart-btn:hover {
          background: #333;
          transform: scale(1.05);
        }
      </style>
      <div class="result-badge">${result}</div>
      <h2>Your personality type!</h2>
      <p>This is a simplified result based on your answers. Each type has unique strengths and ways of seeing the world.</p>
      <button class="restart-btn" onclick="location.reload()">Take it again</button>
    `;
  }
}

customElements.define('mbti-quiz', MBTIQuiz);
