/**
 * My MBTI Quiz Web Component with Multi-language Support (EN, KO, JA, ZH, ES)
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
      },
      ja: {
        selectLang: '言語を選択してください',
        question: '質問',
        of: '/',
        resultTitle: 'あなたの性格タイプ！',
        restart: 'やり直す',
        questions: [
          { id: 'ei', text: '忙しい一週間が終わった後、どのようにリフレッシュしたいですか？', options: [{ label: '友達と外出して新しい人々に会う', value: 'E' }, { label: '一人で静かな時間を過ごすか、親しい友人と会う', value: 'I' }] },
          { id: 'sn', text: '新しいことを学ぶとき、通常どのようなことに注目しますか？', options: [{ label: '事実、詳細、そして実用的な応用', value: 'S' }, { label: 'アイデア、可能性、そして全体像', value: 'N' }] },
          { id: 'tf', text: '難しい決断をするとき、どちらをより重視しますか？', options: [{ label: '論理、一貫性、そして客観的な分析', value: 'T' }, { label: '人々、価値観、そして他者への影響', value: 'F' }] },
          { id: 'jp', text: '日々の仕事やプロジェクトにどのように取り組むのが好きですか？', options: [{ label: '事前に計画を立て、明確なスケジュールに従う', value: 'J' }, { label: '自発的に行動し、選択肢を広げておく', value: 'P' }] },
          { id: 'ei', text: 'グループディスカッションで、あなたは通常...', options: [{ label: '早めに発言して自分の考えを共有する', value: 'E' }, { label: 'まずは聞き役に回り、考えがまとまってから発言する', value: 'I' }] },
          { id: 'sn', text: '問題を解決するとき、どちらに頼る傾向がありますか？', options: [{ label: '証明された方法や過去の経験', value: 'S' }, { label: '直感や創造的な試行錯誤', value: 'N' }] },
          { id: 'tf', text: 'どのような人をより高く評価しますか？', options: [{ label: '公平でルールを遵守する人', value: 'T' }, { label: '共感力があり、心が温かい人', value: 'F' }] },
          { id: 'jp', text: 'あなたのワークスペースは通常...', options: [{ label: '整理整頓されている', value: 'J' }, { label: '散らかっているが機能的', value: 'P' }] }
        ],
        types: {
          INTJ: { title: "建築家", desc: "想像力が豊かで、戦略的な思考の持ち主。あらゆる物事に対して計画を立てます。" },
          INTP: { title: "論理学者", desc: "革新的な発明家で、知識に対する飽くなき渇望を持っています。" },
          ENTJ: { title: "指揮官", desc: "大胆で想像力豊かな強い意志を持つ指導者。常に道を見い出す人々です。" },
          ENTP: { title: "討論者", desc: "知的挑戦を恐れない、賢くて好奇心旺盛な思考家です。" },
          INFJ: { title: "提唱者", desc: "静かで神秘的だが、非常にインスピレーションを与える、飽くなき理想主義者です。" },
          INFP: { title: "仲介者", desc: "詩的で親切、そして利他的。常に良い大義を助けようとする情熱的な人々です。" },
          ENFJ: { title: "主人公", desc: "カリスマ性があり、人々にインスピレーションを与えるリーダー。聴衆を魅了する能力があります。" },
          ENFP: { title: "広報運動家", desc: "情熱的で独創的、かつ社交的な自由人。常に笑顔の理由を見つけられます。" },
          ISTJ: { title: "管理者", desc: "実用的で事実に基づいた思考を持つ、信頼性の高い個人です。" },
          ISFJ: { title: "擁護者", desc: "非常に献身的で温かい保護者。常に愛する人を守る準備ができています。" },
          ESTJ: { title: "幹部", desc: "優れた管理者で、物や人を管理することにおいて右に出る者はいません。" },
          ESFJ: { title: "領事", desc: "非常に思いやりがあり、社交的で人気のある人々。常に助けようとしています。" },
          ISTP: { title: "巨匠", desc: "大胆で実用的な実験者。あらゆる道具を使いこなす達人です。" },
          ISFP: { title: "冒険家", desc: "柔軟で魅力的な芸術家。常に新しいことを探索し、経験する準備ができています。" },
          ESTP: { title: "起業家", desc: "賢くエネルギッシュで、非常に洞察力が鋭い。スリルを楽しむ人々です。" },
          ESFP: { title: "エンターテイナー", desc: "即興的でエネルギッシュ、情熱的な人々。周囲を飽きさせません。" }
        }
      },
      zh: {
        selectLang: '选择您的语言',
        question: '问题',
        of: '/',
        resultTitle: '您的性格类型！',
        restart: '重新开始',
        questions: [
          { id: 'ei', text: '在漫长的一周后，你更喜欢如何充电？', options: [{ label: '和朋友出去并结识新朋友', value: 'E' }, { label: '独处或与亲密的朋友安静地度过', value: 'I' }] },
          { id: 'sn', text: '当学习新事物时，通常什么会引起你的注意？', options: [{ label: '事实、细节和实际应用', value: 'S' }, { label: '想法、可能性和宏观蓝图', value: 'N' }] },
          { id: 'tf', text: '当做出艰难决定时，你更看重什么？', options: [{ label: '逻辑、一致性和客观分析', value: 'T' }, { label: '人、价值观以及对他人的影响', value: 'F' }] },
          { id: 'jp', text: '你更喜欢如何处理日常任务或项目？', options: [{ label: '提前计划并遵循明确的时间表', value: 'J' }, { label: '随性而为并保持各种选择', value: 'P' }] },
          { id: 'ei', text: '在小组讨论中，你通常...', options: [{ label: '早早发言并分享你的想法', value: 'E' }, { label: '先倾听，有了明确的想法后再发言', value: 'I' }] },
          { id: 'sn', text: '解决问题时，你倾向于依赖...', options: [{ label: '经过验证的方法和过去的经验', value: 'S' }, { label: '直觉和创造性的实验', value: 'N' }] },
          { id: 'tf', text: '你更欣赏哪种人？', options: [{ label: '公平且遵守规则的人', value: 'T' }, { label: '有同情心且内心温暖的人', value: 'F' }] },
          { id: 'jp', text: '你的工作空间通常是...', options: [{ label: '整洁有序', value: 'J' }, { label: '杂乱但实用', value: 'P' }] }
        ],
        types: {
          INTJ: { title: "建筑师", desc: "富有想象力和战略性的思想家，一切皆有计划。" },
          INTP: { title: "逻辑学家", desc: "具有强大创新能力的发现者，对知识有无穷的渴求。" },
          ENTJ: { title: "指挥官", desc: "大胆、富有想象力且意志强大的领导者，总能找到出路。" },
          ENTP: { title: "辩论家", desc: "聪明且好奇的思想家，无法抗拒智力挑战。" },
          INFJ: { title: "提唱者", desc: "安静而神秘，但非常鼓舞人心且不知疲倦的理想主义者。" },
          INFP: { title: "调解员", desc: "诗意、善良且利他的人，总是渴望帮助正义事业。" },
          ENFJ: { title: "主人公", desc: "富有魅力且鼓舞人心的领导者，能够让听众着迷。" },
          ENFP: { title: "竞选者", desc: "热情、富有创造力且爱社交的自由灵魂，总能找到微笑的理由。" },
          ISTJ: { title: "物流师", desc: "务实且注重事实的人，可靠性不容置疑。" },
          ISFJ: { title: "守卫者", desc: "非常专注且温暖的守护者，时刻准备保护爱的人。" },
          ESTJ: { title: "总经理", desc: "出色的管理者，在管理事务或人员方面无与伦比。" },
          ESFJ: { title: "执政官", desc: "极具同情心、爱社交且受欢迎的人，总是渴望提供帮助。" },
          ISTP: { title: "鉴赏家", desc: "大胆且务实的实验者，精通各类工具。" },
          ISFP: { title: "探险家", desc: "灵活且充满魅力的艺术家，随时准备探索和体验新事物。" },
          ESTP: { title: "企业家", desc: "聪明、精力充沛且极具洞察力的人，真正享受生活在边缘。" },
          ESFP: { title: "表演者", desc: "自发、精力充沛且热情的人，身边生活永不枯燥。" }
        }
      },
      es: {
        selectLang: 'Elige tu idioma',
        question: 'Pregunta',
        of: 'de',
        resultTitle: '¡Tu tipo de personalidad!',
        restart: 'Hacerlo de nuevo',
        questions: [
          { id: 'ei', text: 'Después de una semana larga, ¿cómo prefieres recargar energías?', options: [{ label: 'Saliendo con amigos y conociendo gente nueva', value: 'E' }, { label: 'Pasando tiempo tranquilo solo o con un amigo cercano', value: 'I' }] },
          { id: 'sn', text: 'Al aprender algo nuevo, ¿qué suele captar tu atención?', options: [{ label: 'Hechos, detalles y aplicaciones prácticas', value: 'S' }, { label: 'Ideas, posibilidades y el panorama general', value: 'N' }] },
          { id: 'tf', text: 'Al tomar una decisión difícil, ¿qué te importa más?', options: [{ label: 'Lógica, consistencia y análisis objetivo', value: 'T' }, { label: 'Personas, valores y el impacto en los demás', value: 'F' }] },
          { id: 'jp', text: '¿Cómo prefieres abordar tus tareas diarias o proyectos?', options: [{ label: 'Planificando con antelación y siguiendo un horario claro', value: 'J' }, { label: 'Siendo espontáneo y manteniendo las opciones abiertas', value: 'P' }] },
          { id: 'ei', text: 'En una discusión grupal, tú sueles...', options: [{ label: 'Hablar pronto y compartir tus pensamientos', value: 'E' }, { label: 'Escuchar primero y hablar una vez que tienes una idea clara', value: 'I' }] },
          { id: 'sn', text: 'Al resolver un problema, tiendes a confiar en...', options: [{ label: 'Métodos probados y experiencia pasada', value: 'S' }, { label: 'Intuición y experimentación creativa', value: 'N' }] },
          { id: 'tf', text: 'Valoras a una persona que es...', options: [{ label: 'Justa y sigue las reglas', value: 'T' }, { label: 'Empática y de buen corazón', value: 'F' }] },
          { id: 'jp', text: 'Tu espacio de trabajo suele estar...', options: [{ label: 'Organizado y ordenado', value: 'J' }, { label: 'Desordenado pero funcional', value: 'P' }] }
        ],
        types: {
          INTJ: { title: "Arquitecto", desc: "Pensadores imaginativos y estratégicos, con un plan para todo." },
          INTP: { title: "Lógico", desc: "Inventores innovadores con una sed insaciable de conocimiento." },
          ENTJ: { title: "Comandante", desc: "Líderes audaces, imaginativos y de voluntad fuerte, siempre encontrando un camino." },
          ENTP: { title: "Innovador", desc: "Pensadores inteligentes y curiosos que no pueden resistirse a un desafío intelectual." },
          INFJ: { title: "Abogado", desc: "Idealistas silenciosos y místicos, pero muy inspiradores e incansables." },
          INFP: { title: "Mediador", desc: "Personas poéticas, amables y altruistas, siempre deseosas de ayudar a una buena causa." },
          ENFJ: { title: "Protagonista", desc: "Líderes carismáticos e inspiradores, capaces de cautivar a sus oyentes." },
          ENFP: { title: "Activista", desc: "Espíritus libres entusiastas, creativos y sociables, que siempre pueden encontrar una razón para sonreír." },
          ISTJ: { title: "Logista", desc: "Individuos prácticos y enfocados en los hechos, cuya confiabilidad no puede ser cuestionada." },
          ISFJ: { title: "Defensor", desc: "Protectores muy dedicados y cálidos, siempre listos para defender a sus seres queridos." },
          ESTJ: { title: "Ejecutivo", desc: "Excelentes administradores, insuperables en la gestión de cosas o personas." },
          ESFJ: { title: "Cónsul", desc: "Personas extraordinariamente cariñosas, sociales y populares, siempre deseosas de ayudar." },
          ISTP: { title: "Virtuoso", desc: "Experimentadores audaces y prácticos, maestros de todo tipo de herramientas." },
          ISFP: { title: "Aventurero", desc: "Artistas flexibles y encantadores, siempre listos para explorar y experimentar algo nuevo." },
          ESTP: { title: "Emprendedor", desc: "Personas inteligentes, enérgicas y muy perceptivas, que realmente disfrutan vivir al límite." },
          ESFP: { title: "Animador", desc: "Personas espontáneas, enérgicas y entusiastas: la vida nunca es aburrida a su alrededor." }
        }
      }
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
        .lang-btn { flex-direction: column; align-items: center; padding: 1.5rem; text-align: center; }
        .lang-btn span:first-child { font-size: 1.5rem; margin-bottom: 0.5rem; }
      </style>
      <h2 style="text-align: center;">Choose your language</h2>
      <div class="lang-grid">
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('en')"><span>🇺🇸</span><span>English</span></button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('ko')"><span>🇰🇷</span><span>한국어</span></button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('ja')"><span>🇯🇵</span><span>日本語</span></button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('zh')"><span>🇨🇳</span><span>简体中文</span></button>
        <button class="lang-btn" onclick="this.getRootNode().host.setLanguage('es')"><span>🇪🇸</span><span>Español</span></button>
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
        :host { display: block; font-family: 'Plus Jakarta Sans', sans-serif; max-width: 520px; width: 100%; margin: 0 auto; background: white; border-radius: 28px; padding: 2rem; box-shadow: 0 20px 40px -12px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.03); }
        .progress { margin-bottom: 1.5rem; font-size: 0.8125rem; color: #64748b; display: flex; justify-content: space-between; align-items: center; font-weight: 600; }
        .progress-bar { height: 6px; background: #f1f5f9; border-radius: 3px; flex-grow: 1; margin: 0 1rem; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--accent-color, #6366f1); transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        h2 { font-size: 1.375rem; font-weight: 800; color: #0f172a; margin-bottom: 1.75rem; line-height: 1.3; text-align: center; letter-spacing: -0.02em; }
        .options { display: grid; gap: 0.75rem; }
        button { background: #f8fafc; border: 1.5px solid transparent; padding: 1rem 1.5rem; border-radius: 16px; text-align: center; font-size: 1rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center; justify-content: center; }
        button:hover { background: #ffffff; border-color: var(--accent-color); color: var(--accent-color); transform: scale(1.02); box-shadow: 0 8px 16px -4px oklch(0.65 0.2 260 / 0.1); }
        button:active { transform: scale(0.98); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      </style>
    `;
  }
}

customElements.define('mbti-quiz', MBTIQuiz);
