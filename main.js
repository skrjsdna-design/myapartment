/**
 * MBTI Quiz Web Component with Multi-language Support & Rich Content
 */
class MBTIQuiz extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentStep = -1;
    this.language = 'en';
    this.dimensionScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    this.translations = {
      en: {
        selectLang: 'Choose your language',
        question: 'Question',
        of: 'of',
        resultTitle: 'Your personality type!',
        restart: 'Take it again',
        questions: [
          { id: 'ei', text: 'After a long week, how do you prefer to recharge?', options: [{ label: 'Going out with friends and meeting new people', value: 'E' }, { label: 'Having some quiet time alone or with a close friend', value: 'I' }] },
          { id: 'sn', text: 'When learning something new, what usually catches your attention?', options: [{ label: 'Facts, details, and practical applications', value: 'S' }, { label: 'Ideas, possibilities, and the big picture', value: 'N' }] },
          { id: 'tf', text: 'When making a difficult decision, what matters more to you?', options: [{ label: 'Logic, consistency, and objective analysis', value: 'T' }, { label: 'People, values, and the impact on others', value: 'F' }] },
          { id: 'jp', text: 'How do you prefer to approach your daily tasks or projects?', options: [{ label: 'Planning ahead and following a clear schedule', value: 'J' }, { label: 'Being spontaneous and keeping options open', value: 'P' }] },
          { id: 'ei', text: 'In a group discussion, you usually...', options: [{ label: 'Speak up early and share your thoughts', value: 'E' }, { label: 'Listen first and speak once you have a clear idea', value: 'I' }] },
          { id: 'sn', text: 'When solving a problem, you tend to rely on...', options: [{ label: 'Proven methods and past experience', value: 'S' }, { label: 'Intuition and creative experimentation', value: 'N' }] },
          { id: 'tf', text: 'You value a person who is...', options: [{ label: 'Fair and follows the rules', value: 'T' }, { label: 'Empathetic and kind-hearted', value: 'F' }] },
          { id: 'jp', text: 'Your workspace is usually...', options: [{ label: 'Organized and tidy', value: 'J' }, { label: 'Cluttered but functional', value: 'P' }] }
        ],
        types: {
          INTJ: { title: "The Architect", desc: "Imaginative and strategic thinkers, with a plan for everything." },
          INTP: { title: "The Logician", desc: "Innovative inventors with an unquenchable thirst for knowledge." },
          ENTJ: { title: "The Commander", desc: "Bold, imaginative and strong-willed leaders, always finding a way." },
          ENTP: { title: "The Debater", desc: "Smart and curious thinkers who cannot resist an intellectual challenge." },
          INFJ: { title: "The Advocate", desc: "Quiet and mystical, yet very inspiring and tireless idealists." },
          INFP: { title: "The Mediator", desc: "Poetic, kind and altruistic people, always eager to help a good cause." },
          ENFJ: { title: "The Protagonist", desc: "Charismatic and inspiring leaders, able to mesmerize their listeners." },
          ENFP: { title: "The Campaigner", desc: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile." },
          ISTJ: { title: "The Logistician", desc: "Practical and fact-minded individuals, whose reliability cannot be doubted." },
          ISFJ: { title: "The Defender", desc: "Very dedicated and warm protectors, always ready to defend their loved ones." },
          ESTJ: { title: "The Executive", desc: "Excellent administrators, unsurpassed at managing things – or people." },
          ESFJ: { title: "The Consul", desc: "Extraordinarily caring, social and popular people, always eager to help." },
          ISTP: { title: "The Virtuoso", desc: "Bold and practical experimenters, masters of all kinds of tools." },
          ISFP: { title: "The Adventurer", desc: "Flexible and charming artists, always ready to explore and experience something new." },
          ESTP: { title: "The Entrepreneur", desc: "Smart, energetic and very perceptive people, who truly enjoy living on the edge." },
          ESFP: { title: "The Entertainer", desc: "Spontaneous, energetic and enthusiastic people – life is never boring around them." }
        }
      },
      ko: {
        selectLang: '언어를 선택하세요',
        question: '질문',
        of: '/',
        resultTitle: '당신의 성격 유형은!',
        restart: '다시 하기',
        questions: [
          { id: 'ei', text: '긴 일주일이 끝난 후, 어떻게 에너지를 충전하시겠어요?', options: [{ label: '친구들과 밖으로 나가 새로운 사람들을 만난다', value: 'E' }, { label: '혼자서 조용한 시간을 보내거나 친한 친구를 만난다', value: 'I' }] },
          { id: 'sn', text: '새로운 것을 배울 때, 보통 무엇에 더 주의를 기울이시나요?', options: [{ label: '사실, 구체적인 세부 사항, 실제 적용 사례', value: 'S' }, { label: '아이디어, 가능성, 전체적인 큰 그림', value: 'N' }] },
          { id: 'tf', text: '어려운 결정을 내려야 할 때, 무엇이 더 중요하다고 생각하시나요?', options: [{ label: '논리, 일관성, 객관적인 분석', value: 'T' }, { label: '사람들, 가치관, 타인에게 미칠 영향', value: 'F' }] },
          { id: 'jp', text: '매일 하는 일이나 프로젝트를 어떤 방식으로 처리하는 것을 선호하시나요?', options: [{ label: '미리 계획을 세우고 정해진 일정에 따른다', value: 'J' }, { label: '그때그때 마음 가는 대로 하고 선택의 여지를 남겨둔다', value: 'P' }] },
          { id: 'ei', text: '그룹 토론을 할 때 당신은 대개...', options: [{ label: '먼저 나서서 자신의 생각을 공유한다', value: 'E' }, { label: '다른 사람들의 말을 먼저 듣고 정리된 생각을 말한다', value: 'I' }] },
          { id: 'sn', text: '문제를 해결할 때 당신은 주로...', options: [{ label: '검증된 방법과 과거의 경험에 의존한다', value: 'S' }, { label: '직관과 창의적인 시도에 의존한다', value: 'N' }] },
          { id: 'tf', text: '당신은 어떤 사람을 더 가치 있게 여기나요?', options: [{ label: '공정하고 규칙을 준수하는 사람', value: 'T' }, { label: '공감 능력이 좋고 마음이 따뜻한 사람', value: 'F' }] },
          { id: 'jp', text: '당신의 작업 공간은 대개...', options: [{ label: '정리정돈이 잘 되어 있다', value: 'J' }, { label: '어지럽혀져 있지만 나름의 질서가 있다', value: 'P' }] }
        ],
        types: {
          INTJ: { title: "용의주도한 전략가", desc: "모든 일에 계획을 세우며 상상력이 풍부하고 전략적인 사고를 가진 사람들입니다." },
          INTP: { title: "논리적인 사색가", desc: "끊임없이 지식을 갈구하며 혁신적인 발명가 기질을 가진 사람들입니다." },
          ENTJ: { title: "대담한 통솔자", desc: "대담하고 상상력이 풍부하며 의지가 강한 지도자로, 언제나 길을 찾아내는 사람들입니다." },
          ENTP: { title: "뜨거운 논쟁을 즐기는 변론가", desc: "지적 도전을 두려워하지 않는 영리하고 호기심 많은 사색가들입니다." },
          INFJ: { title: "선의의 옹호자", desc: "조용하고 신비롭지만 영감을 주는 지치지 않는 이상주의자들입니다." },
          INFP: { title: "열정적인 중재자", desc: "상냥하고 이타적인 성격으로 언제나 선한 일을 돕고자 하는 열정적인 사람들입니다." },
          ENFJ: { title: "정의로운 사회운동가", desc: "카리스마 있고 영감을 주는 리더로 청중을 사로잡는 능력이 있습니다." },
          ENFP: { title: "재기발랄한 활동가", desc: "열정적이고 창의적이며 사교적인 자유로운 영혼의 소유자들입니다." },
          ISTJ: { title: "청렴결백한 논리주의자", desc: "실용적이고 사실에 근거하며 신뢰할 수 있는 사람들입니다." },
          ISFJ: { title: "용감한 수호자", desc: "매우 헌신적이고 따뜻한 보호자로 언제나 사랑하는 이들을 지킬 준비가 되어 있습니다." },
          ESTJ: { title: "엄격한 관리자", desc: "사물과 사람을 관리하는 데 타의 추종을 불허하는 뛰어난 관리자들입니다." },
          ESFJ: { title: "사교적인 외교관", desc: "타인을 향한 세심한 관심과 사교적인 성향으로 인기가 많은 사람들입니다." },
          ISTP: { title: "만능 재주꾼", desc: "대담하고 실용적인 실험가이자 모든 도구를 다루는 데 능숙한 거장들입니다." },
          ISFP: { title: "호기심 많은 예술가", desc: "유연하고 매력적인 예술가로 항상 새로운 것을 탐구할 준비가 되어 있습니다." },
          ESTP: { title: "모험을 즐기는 사업가", desc: "명석하고 에너지가 넘치며 직관력이 뛰어난 사람들입니다." },
          ESFP: { title: "자유로운 영혼의 연예인", desc: "즉흥적이고 에너지가 넘치며 열정적인 사람들로 주변 사람들을 즐겁게 합니다." }
        }
      }
      // Note: JA and ES could be added here similarly to make it complete.
    };
  }

  connectedCallback() {
    this.render();
  }

  setLanguage(lang) {
    this.language = lang;
    this.currentStep = 0;
    this.dimensionScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    this.render();
  }

  handleAnswer(value) {
    this.dimensionScores[value]++;
    const t = this.translations[this.language];
    if (this.currentStep < t.questions.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.showResult();
    }
  }

  showResult() {
    const s = this.dimensionScores;
    const result = (s.E >= s.I ? 'E' : 'I') + (s.S >= s.N ? 'S' : 'N') + (s.T >= s.F ? 'T' : 'F') + (s.J >= s.P ? 'J' : 'P');
    this.renderResult(result);
  }

  render() {
    if (this.currentStep === -1) {
      this.renderLanguageSelection();
      return;
    }

    const t = this.translations[this.language] || this.translations['en'];
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
          <button onclick="this.getRootNode().host.handleAnswer('${opt.value}')">
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
        .lang-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2rem; }
        .lang-btn { flex-direction: column; align-items: center; padding: 2rem; text-align: center; }
        .lang-btn span:first-child { font-size: 1.5rem; margin-bottom: 0.5rem; }
      </style>
      <h2 style="text-align: center;">Choose your language</h2>
      <div class="lang-grid">
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('en')"><span>🇺🇸</span><span>English</span></button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('ko')"><span>🇰🇷</span><span>한국어</span></button>
      </div>
    `;
  }

  renderResult(result) {
    const t = this.translations[this.language] || this.translations['en'];
    const typeInfo = t.types[result] || { title: result, desc: "" };
    this.shadowRoot.innerHTML = `
      ${this.getCommonStyles()}
      <style>
        :host { text-align: center; animation: fadeIn 0.5s ease-out; }
        .result-badge { display: inline-block; background: var(--accent-color); color: white; font-size: 3rem; font-weight: 800; padding: 1rem 2.5rem; border-radius: 24px; margin-bottom: 2rem; box-shadow: 0 20px 40px -10px oklch(0.65 0.2 260 / 0.4); }
        .type-title { font-size: 1.5rem; color: var(--accent-color); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; }
        .type-desc { color: #64748b; font-size: 1.125rem; line-height: 1.8; margin-bottom: 3rem; max-width: 500px; margin-left: auto; margin-right: auto; }
        .restart-btn { background: #0f172a; color: white; border: none; padding: 1.25rem 2.5rem; border-radius: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .restart-btn:hover { background: #334155; transform: scale(1.05); }
      </style>
      <div class="result-badge">${result}</div>
      <div class="type-title">${typeInfo.title}</div>
      <p class="type-desc">${typeInfo.desc}</p>
      <button class="restart-btn" onclick="location.reload()">${t.restart}</button>
    `;
  }

  getCommonStyles() {
    return `
      <style>
        :host { display: block; font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; width: 100%; margin: 0 auto; background: white; border-radius: 32px; padding: 3rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.03); }
        .progress { margin-bottom: 2.5rem; font-size: 0.875rem; color: #64748b; display: flex; justify-content: space-between; align-items: center; font-weight: 600; }
        .progress-bar { height: 8px; background: #f1f5f9; border-radius: 4px; flex-grow: 1; margin: 0 1.5rem; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--accent-color, #6366f1); transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        h2 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-bottom: 2.5rem; line-height: 1.3; text-align: center; letter-spacing: -0.02em; }
        .options { display: grid; gap: 1.25rem; }
        button { background: #f8fafc; border: 2px solid transparent; padding: 1.5rem 2rem; border-radius: 20px; text-align: center; font-size: 1.125rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center; justify-content: center; }
        button:hover { background: #ffffff; border-color: var(--accent-color); color: var(--accent-color); transform: scale(1.02); box-shadow: 0 10px 20px -5px oklch(0.65 0.2 260 / 0.1); }
        button:active { transform: scale(0.98); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      </style>
    `;
  }
}

customElements.define('mbti-quiz', MBTIQuiz);
