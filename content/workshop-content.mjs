// Single source of truth for every content surface that would otherwise drift:
// the English site, the French site, the English deck, the French deck, and the
// root README agenda table. Adversarial build review finding BLD-H3 identified
// all five as hand-maintained with no enforced pairing key; this module plus
// scripts/validate-content.mjs is the mitigation.
//
// Rules this file must keep true, all of them machine-checked:
//   * Six sections, English durations 10/15/30/15/15/5, summing to 90.
//   * Sixteen slides, ids 01 through 16, each used exactly once.
//   * Slide group durations equal their section duration, per language.
//   * Every en value has a non-empty fr counterpart, and no fr value is a copy.
//
// FRENCH DURATION DECISION (required by planning log RC-06, research CUR-H4)
// ------------------------------------------------------------------------
// durationMinutes is per language, not shared. Research found that French
// delivery runs longer than English at equal comprehension, so copying the
// English allocation would quietly overrun the block with the highest variance.
//
// The recorded choice is a drop plus a reallocation, not a longer session:
//   * DROPPED IN FRENCH: the reopen-and-restore checkpoint in section 5. The
//     research oracle already marks that checkpoint "only if rehearsed", the
//     canvas documentation contains no reopening guidance at all, and follow-on
//     item WI-08 exists precisely because the behaviour is unverified. It is the
//     only checkpoint in the session that can be removed without removing a
//     safety statement or a learner judgment beat.
//   * REALLOCATED: the five minutes that drop frees move from section 5 to
//     section 3, the creation and interaction block, which carries the agent
//     generation variance and the abort thresholds.
//
// Result: English 10/15/30/15/15/5, French 10/15/35/15/10/5. Both total 90.
// The ninety-minute envelope is fixed in both languages because the agenda, the
// deck grouping contract, and the booked session length all depend on it.
//
// The English values are what the root README is validated against. The French
// values are what the French tree and the French deck are validated against. A
// longer French total is a validation failure, not reported drift.
//
// CORRECTIONS APPLIED TO THE DRAFT SLIDE OUTLINE
// ----------------------------------------------
// The sixteen-slide outline in the publishing research predates two corrections
// and is deliberately not copied literally here:
//   * It named Interactive mode for agenda section 2. The mode used in section 2
//     is Plan mode. Interactive appears only on slide 03, where the three
//     documented modes are contrasted.
//   * It allocated ten of the ninety minutes to a setup readiness check.
//     Installation, sign-in, and runtime prerequisites are completed and
//     verified before the timed workshop, so no slide allocates session time
//     to them.

/** Fixed session envelope, identical in both languages. */
export const AGENDA_TOTAL_MINUTES = 90;

/** Languages every paired record must supply. */
export const LANGUAGES = ['en', 'fr'];

/**
 * Lab page slugs. Identical across languages by design: identifiers, machine
 * values, and lab slugs never localize, only prose does.
 */
export const LAB_SLUGS = [
  'lab-00-setup',
  'lab-01-create-canvas',
  'lab-02-refine-canvas',
  'lab-03-verify-share'
];

/**
 * Controlled vocabulary for the `covers:` front matter list every page declares.
 * A marker naming a safety-critical statement must appear on both counterparts,
 * so the vocabulary is closed: an unknown marker is a typo, and a typo that went
 * unnoticed is how a French page loses a safety statement while its
 * translation_key still matches.
 */
export const REQUIRED_CONTENT_MARKERS = [
  'synthetic-data-only',
  'no-endorsement',
  'no-installation-in-class',
  'unrehearsed-proposal-notice',
  'review-dependencies-before-run',
  'human-review-required',
  'public-code-warning',
  'delta-and-invariant-oracle',
  'persistence-not-guaranteed',
  'scope-boundaries',
  'telemetry-disclosure',
  'abort-threshold',
  'learner-decision',
  'track-acceptance-bars'
];

/** Retrieval date for every URL in `sources`. Not a publication date. */
export const SOURCE_RETRIEVAL_DATE = '2026-09-22';

/**
 * App version the material was rehearsed against. Null because no rehearsal has
 * happened. Deck notes must state this rather than imply a tested version.
 */
export const TESTED_APP_VERSION = null;

const SOURCES = {
  appOverview: 'https://docs.github.com/en/copilot/concepts/agents/github-copilot-app',
  quickstart: 'https://docs.github.com/en/copilot/get-started/quickstart-copilot-app',
  canvas: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions',
  sessions: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions',
  customization: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app',
  slashCommands: 'https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands'
};

/**
 * Six agenda sections. Titles and observable outcomes come from the research
 * agenda table verbatim; bodies and notes are authored here.
 */
export const sections = [
  {
    id: 'section-01',
    translationKey: 'section-01',
    order: 1,
    durationMinutes: { en: 10, fr: 10 },
    labId: null,
    title: {
      en: 'Meet the App and Set Safe Boundaries',
      fr: "Découvrir l'application et fixer les limites"
    },
    outcome: {
      en: 'Distinguish app, canvas, and published website; name review responsibilities.',
      fr: "Distinguer l'application, le canevas et le site publié; nommer les responsabilités de révision."
    },
    body: {
      en: [
        'Separate three things people routinely conflate: the desktop app, a canvas extension running inside it, and the published workshop site you are reading.',
        'Agree on the boundary for the next ninety minutes: synthetic data only, no external services, no commits, no deployment.',
        'Name who reviews generated output, because the agent produces a proposal and a human accepts it.'
      ],
      fr: [
        "Distinguer trois choses souvent confondues : l'application de bureau, une extension canevas qui s'exécute à l'intérieur, et le site d'atelier publié que vous consultez.",
        "S'entendre sur les limites des quatre-vingt-dix prochaines minutes : données fictives seulement, aucun service externe, aucune validation de code, aucun déploiement.",
        "Désigner qui révise le contenu généré, car l'agent produit une proposition et un humain l'accepte."
      ]
    },
    notes: {
      en: 'Open by naming what this is not: not Power Apps, not Copilot Workspace, not Spark. State the data-handling disclosure before anyone opens a session. Nothing in this section is hands-on.',
      fr: "Commencez par dire ce que ce n'est pas : ni Power Apps, ni Copilot Workspace, ni Spark. Communiquez l'avis sur le traitement des données avant toute ouverture de session. Cette section ne comporte aucune manipulation."
    }
  },
  {
    id: 'section-02',
    translationKey: 'section-02',
    order: 2,
    durationMinutes: { en: 15, fr: 15 },
    labId: 'lab-00-setup',
    title: {
      en: 'Start a Session and Agree on the Plan',
      fr: 'Démarrer une session et valider le plan'
    },
    outcome: {
      en: 'Select approved project and Plan mode; agree on acceptance criteria.',
      fr: "Sélectionner le projet approuvé et le mode Plan; convenir des critères d'acceptation."
    },
    body: {
      en: [
        'Open a session against the approved project folder, never a folder holding real work.',
        'Use Plan mode so the agent proposes an approach you can read and change before anything is generated.',
        'Write down the acceptance criteria you will check later, phrased as deltas and invariants rather than fixed totals.'
      ],
      fr: [
        "Ouvrez une session sur le dossier de projet approuvé, jamais sur un dossier contenant du travail réel.",
        "Utilisez le mode Plan pour que l'agent propose une démarche que vous pouvez lire et corriger avant toute génération.",
        "Notez les critères d'acceptation que vous vérifierez plus tard, formulés en écarts et en invariants plutôt qu'en totaux fixes."
      ]
    },
    notes: {
      en: 'The learner judgment beat here is accepting or rewriting the plan the agent proposes. A plan accepted without reading is the failure mode this section exists to prevent.',
      fr: "La décision confiée à la personne apprenante ici consiste à accepter ou à réécrire le plan proposé par l'agent. Un plan accepté sans lecture est précisément l'échec que cette section vise à éviter."
    }
  },
  {
    id: 'section-03',
    translationKey: 'section-03',
    order: 3,
    durationMinutes: { en: 30, fr: 35 },
    labId: 'lab-01-create-canvas',
    title: {
      en: 'Create and Use the Team Task Board',
      fr: 'Créer et utiliser le tableau de tâches'
    },
    outcome: {
      en: 'Create canvas, add through UI, move through agent, compare actual state.',
      fr: "Créer le canevas, ajouter par l'interface, déplacer par l'agent, comparer l'état réel."
    },
    body: {
      en: [
        'Send the reviewed creation prompt and record your own baseline counts the moment the board appears.',
        'Review the dependencies the agent reports and decide whether to approve them, before anything runs.',
        'Add one task through the interface and move one task through the agent, then compare what each side reports against what you can see.'
      ],
      fr: [
        "Envoyez l'invite de création validée et notez vos propres compteurs de référence dès l'apparition du tableau.",
        "Examinez les dépendances signalées par l'agent et décidez de les approuver ou non, avant toute exécution.",
        "Ajoutez une tâche par l'interface et déplacez-en une par l'agent, puis comparez ce que chaque côté rapporte avec ce que vous voyez."
      ]
    },
    notes: {
      en: 'Highest-variance block in the session and the one the abort thresholds govern. Start the clock when the creation prompt is sent. French receives five extra minutes here, taken from section 5.',
      fr: "Bloc le plus variable de la séance et celui que régissent les seuils d'abandon. Démarrez le chronomètre à l'envoi de l'invite de création. Le français dispose ici de cinq minutes de plus, prises sur la section 5."
    }
  },
  {
    id: 'section-04',
    translationKey: 'section-04',
    order: 4,
    durationMinutes: { en: 15, fr: 15 },
    labId: 'lab-02-refine-canvas',
    title: {
      en: 'Refine One Requirement at a Time',
      fr: 'Améliorer une exigence à la fois'
    },
    outcome: {
      en: 'Add a priority filter without changing underlying task data.',
      fr: 'Ajouter un filtre de priorité sans modifier les données des tâches.'
    },
    body: {
      en: [
        'Ask for exactly one bounded change: a priority filter over the tasks already on the board.',
        'State the invariant up front, that filtering changes what is visible and never what is stored.',
        'Clear the filter and confirm the previous visible count returns.'
      ],
      fr: [
        "Demandez exactement un changement circonscrit : un filtre de priorité sur les tâches déjà présentes.",
        "Énoncez l'invariant dès le départ : le filtre modifie ce qui est visible, jamais ce qui est stocké.",
        'Retirez le filtre et confirmez le retour du nombre visible précédent.'
      ]
    },
    notes: {
      en: 'The learner judgment beat is choosing which discrepancy to fix first when the filter does more than asked. Resist a second request until the first is verified.',
      fr: "La décision confiée à la personne apprenante consiste à choisir l'écart à corriger en premier lorsque le filtre en fait plus que demandé. Ne formulez pas de seconde demande avant d'avoir vérifié la première."
    }
  },
  {
    id: 'section-05',
    translationKey: 'section-05',
    order: 5,
    durationMinutes: { en: 15, fr: 10 },
    labId: 'lab-03-verify-share',
    title: {
      en: 'Review, Verify, and Prepare a Handoff',
      fr: 'Examiner, vérifier et préparer la transmission'
    },
    outcome: {
      en: 'Inspect Changes, test rehearsed persistence behavior, separate source/state sharing.',
      fr: "Inspecter les modifications, tester le comportement de persistance répété, séparer le partage du code et de l'état."
    },
    body: {
      en: [
        'Read the Changes view yourself and correlate each file with behaviour you can actually see.',
        'Check the persistence path the canvas reports, treating any reopen guarantee as unverified until it is rehearsed.',
        'Decide separately whether the extension source may be shared and whether the board state may be shared.'
      ],
      fr: [
        'Lisez vous-même la vue des modifications et reliez chaque fichier à un comportement observable.',
        "Vérifiez le chemin de persistance indiqué par le canevas, en considérant toute garantie de réouverture comme non vérifiée tant qu'elle n'a pas été répétée.",
        "Décidez séparément si le code de l'extension peut être partagé et si l'état du tableau peut l'être."
      ]
    },
    notes: {
      en: 'The learner judgment beat is deciding whether the validation the agent generated is sufficient evidence. In French this section runs ten minutes and the reopen checkpoint is dropped, per the recorded duration decision at the top of this file.',
      fr: "La décision confiée à la personne apprenante consiste à juger si la validation générée par l'agent constitue une preuve suffisante. En français, cette section dure dix minutes et le point de contrôle de réouverture est retiré, conformément à la décision de durée consignée en tête de ce fichier."
    }
  },
  {
    id: 'section-06',
    translationKey: 'section-06',
    order: 6,
    durationMinutes: { en: 5, fr: 5 },
    labId: null,
    title: {
      en: 'Wrap-Up and Questions',
      fr: 'Bilan et questions'
    },
    outcome: {
      en: 'Explain observed results, remaining limits, and an approved next step.',
      fr: 'Expliquer les résultats observés, les limites restantes et une prochaine étape approuvée.'
    },
    body: {
      en: [
        'Each person names one result they verified and one limit they hit.',
        'Restate what was never tested today, so nobody leaves with a false guarantee.',
        'Agree on one next step that stays inside the approvals already in place.'
      ],
      fr: [
        'Chaque personne nomme un résultat vérifié et une limite rencontrée.',
        "Redites ce qui n'a pas été testé aujourd'hui, pour que personne ne reparte avec une fausse garantie.",
        'Convenez d\'une prochaine étape qui reste dans le cadre des approbations déjà obtenues.'
      ]
    },
    notes: {
      en: 'Close on limits, not on a success claim. Point to the resources page in the language the cohort is being delivered in.',
      fr: "Terminez sur les limites, pas sur une déclaration de réussite. Renvoyez à la page des ressources dans la langue de la séance."
    }
  }
];

/**
 * Slide groups fixed by the deck implementation contract. Each group's slide
 * durations must sum to its section duration, in each language independently.
 */
export const SLIDE_GROUPS = [
  { sectionId: 'section-01', slideIds: ['01', '02', '03'] },
  { sectionId: 'section-02', slideIds: ['04', '05'] },
  { sectionId: 'section-03', slideIds: ['06', '07', '08'] },
  { sectionId: 'section-04', slideIds: ['09', '10', '11'] },
  { sectionId: 'section-05', slideIds: ['12', '13', '14'] },
  { sectionId: 'section-06', slideIds: ['15', '16'] }
];

/**
 * Sixteen paired slide records. `image` and `alt` stay null until follow-on work
 * item WI-02 captures sanitized screenshots from an actual rehearsal; inventing
 * them would be worse than shipping none.
 */
export const slides = [
  {
    id: '01',
    translationKey: 'slide-01',
    sectionId: 'section-01',
    labId: null,
    durationMinutes: { en: 2, fr: 2 },
    image: null,
    alt: null,
    sources: [SOURCES.appOverview],
    title: {
      en: 'A Canvas-First Workshop',
      fr: 'Un atelier centré sur les canevas'
    },
    body: {
      en: [
        'Ninety minutes, one spoken language, hands on a fictional Team Task Board.',
        'Synthetic data only. No customer, citizen, employee, or proprietary data.',
        'Audience examples are illustrative. Nothing here claims endorsement or compliance.'
      ],
      fr: [
        "Quatre-vingt-dix minutes, une seule langue parlée, les mains sur un tableau de tâches fictif.",
        'Données fictives uniquement. Aucune donnée de clientèle, de citoyens, de personnel ou propriétaire.',
        "Les exemples d'organisations sont illustratifs. Rien ici ne prétend à une approbation ou à une conformité."
      ]
    },
    notes: {
      en: 'Say the synthetic-data boundary out loud before the first session opens. Recovery lever if anything is unclear: the prepared reference board, which every learner can switch to at any point.',
      fr: "Énoncez la limite des données fictives à voix haute avant la première session. Levier de reprise en cas de doute : le tableau de référence préparé, vers lequel chacun peut basculer à tout moment."
    }
  },
  {
    id: '02',
    translationKey: 'slide-02',
    sectionId: 'section-01',
    labId: null,
    durationMinutes: { en: 3, fr: 3 },
    image: null,
    alt: null,
    sources: [SOURCES.quickstart],
    title: {
      en: 'Route and Outcomes',
      fr: 'Parcours et objectifs'
    },
    body: {
      en: [
        'Six sections, four hands-on labs, one board carried from start to finish.',
        'Browser materials stay on the workshop site; the work itself happens in the app.',
        'Every acceptance check is a delta or an invariant, never a fixed total.'
      ],
      fr: [
        'Six sections, quatre ateliers pratiques, un seul tableau du début à la fin.',
        "Les documents de référence restent sur le site de l'atelier; le travail se fait dans l'application.",
        "Chaque critère d'acceptation est un écart ou un invariant, jamais un total fixe."
      ]
    },
    notes: {
      en: 'Point people at the lab pages in the language this cohort is running in. Success check for this slide: everyone can reach their own language tree.',
      fr: "Orientez le groupe vers les pages d'atelier dans la langue de la séance. Vérification pour cette diapositive : chacun accède à son arborescence linguistique."
    }
  },
  {
    id: '03',
    translationKey: 'slide-03',
    sectionId: 'section-01',
    labId: null,
    durationMinutes: { en: 5, fr: 5 },
    image: null,
    alt: null,
    sources: [SOURCES.appOverview, SOURCES.canvas, SOURCES.sessions],
    title: {
      en: 'App, Canvas, and Boundaries',
      fr: 'Application, canevas et limites'
    },
    body: {
      en: [
        'The desktop app runs sessions. A canvas extension is a surface inside it. This website is neither.',
        'Three documented session modes exist: Interactive, Plan, and Autopilot. We use one of them deliberately.',
        'Generated code carries a public-code warning and organization policy may restrict the app independently of your plan.'
      ],
      fr: [
        "L'application de bureau exécute les sessions. Une extension canevas est une surface interne. Ce site web n'est ni l'un ni l'autre.",
        "Trois modes de session sont documentés : Interactive, Plan et Autopilot. Nous en utiliserons un de façon délibérée.",
        "Le code généré s'accompagne d'un avertissement sur le code public, et la politique de l'organisation peut restreindre l'application indépendamment de votre forfait."
      ]
    },
    notes: {
      en: 'This is the only slide that lists all three modes. Do not conflate the app with Power Apps, Copilot Workspace, or Spark. Deliver the telemetry and data-handling disclosure here if it has not already been delivered in writing.',
      fr: "C'est la seule diapositive qui énumère les trois modes. Ne confondez pas l'application avec Power Apps, Copilot Workspace ou Spark. Communiquez ici l'avis sur la télémétrie et le traitement des données s'il n'a pas déjà été transmis par écrit."
    }
  },
  {
    id: '04',
    translationKey: 'slide-04',
    sectionId: 'section-02',
    labId: null,
    durationMinutes: { en: 5, fr: 5 },
    image: null,
    alt: null,
    sources: [SOURCES.sessions, SOURCES.customization],
    title: {
      en: 'Start a Session in Plan Mode',
      fr: 'Démarrer une session en mode Plan'
    },
    body: {
      en: [
        'Open the session against the approved project folder, and confirm it is the approved one.',
        'Choose Plan mode so the agent proposes an approach before it generates anything.',
        'Read the proposed plan and change it. Accepting a plan you have not read is the failure this beat prevents.'
      ],
      fr: [
        'Ouvrez la session sur le dossier de projet approuvé, et confirmez que c\'est bien celui-là.',
        "Choisissez le mode Plan pour que l'agent propose une démarche avant toute génération.",
        "Lisez le plan proposé et modifiez-le. Accepter un plan non lu est précisément l'échec que ce temps d'arrêt évite."
      ]
    },
    notes: {
      en: 'Plan mode is the mode for this section. Model selection is demonstrated by the facilitator only, because automatic selection is the only option on some plans and a learner step that assumes otherwise fails. Inherited skills, MCP servers, and tool approvals should be inspected with the organizer beforehand.',
      fr: "Le mode Plan est le mode de cette section. Le choix du modèle est démontré uniquement par la personne qui anime, car certains forfaits n'offrent que la sélection automatique et une étape apprenante qui suppose le contraire échoue. Les compétences héritées, les serveurs MCP et les autorisations d'outils doivent être examinés au préalable avec l'organisation."
    }
  },
  {
    id: '05',
    translationKey: 'slide-05',
    sectionId: 'section-02',
    labId: 'lab-00-setup',
    durationMinutes: { en: 10, fr: 10 },
    image: null,
    alt: null,
    sources: [SOURCES.sessions, SOURCES.canvas],
    title: {
      en: 'Lab 00: Agree on the Plan',
      fr: 'Atelier 00 : Valider le plan'
    },
    body: {
      en: [
        'Paste the synthetic board fixture as context so the agent and the room share one vocabulary.',
        'Have the agent restate the requirements, then correct at least one thing it got wrong or left vague.',
        'Write your acceptance criteria as deltas and invariants before any code exists.'
      ],
      fr: [
        "Collez le jeu de données fictif du tableau comme contexte, afin que l'agent et le groupe partagent le même vocabulaire.",
        "Demandez à l'agent de reformuler les exigences, puis corrigez au moins un point erroné ou imprécis.",
        "Rédigez vos critères d'acceptation en écarts et en invariants avant qu'aucun code n'existe."
      ]
    },
    notes: {
      en: 'Lab pause. Success check: the learner has changed something in the restated plan. Recovery: if the agent will not restate, hand over the written requirements from the lab page and move on; the plan matters more than who typed it.',
      fr: "Pause atelier. Vérification : la personne apprenante a modifié un élément du plan reformulé. Reprise : si l'agent ne reformule pas, remettez les exigences écrites de la page d'atelier et poursuivez; le plan compte davantage que son auteur."
    }
  },
  {
    id: '06',
    translationKey: 'slide-06',
    sectionId: 'section-03',
    labId: null,
    durationMinutes: { en: 5, fr: 6 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas],
    title: {
      en: 'Describe the Board',
      fr: 'Décrire le tableau'
    },
    body: {
      en: [
        'Four seed tasks, stable identifiers, three statuses, two priorities. All fictional.',
        'People and the agent act on the same state, so both paths need labelled, keyboard-reachable controls.',
        'Capability names in the documentation are examples. Inspect what your board actually exposes.'
      ],
      fr: [
        'Quatre tâches de départ, des identifiants stables, trois états, deux priorités. Tout est fictif.',
        "Les personnes et l'agent agissent sur le même état, donc les deux voies exigent des commandes libellées et accessibles au clavier.",
        "Les noms de capacités figurant dans la documentation sont des exemples. Inspectez ce que votre tableau expose réellement."
      ]
    },
    notes: {
      en: 'Record each learner\'s own observed totals now. Do not announce a number for the room: every generated board differs, and a shared expected total marks correct work as failed.',
      fr: "Faites noter à chacun ses propres compteurs observés maintenant. N'annoncez pas de chiffre commun : chaque tableau généré diffère, et un total attendu partagé fait échouer du travail correct."
    }
  },
  {
    id: '07',
    translationKey: 'slide-07',
    sectionId: 'section-03',
    labId: null,
    durationMinutes: { en: 5, fr: 6 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas, SOURCES.slashCommands],
    title: {
      en: 'Create a Canvas, Then Review Before Running',
      fr: 'Créer un canevas, puis vérifier avant exécution'
    },
    body: {
      en: [
        'Send the reviewed creation prompt and watch the canvas surface appear beside the conversation.',
        'The prompt requires the agent to list every dependency and wait. Reporting a dependency is correct behaviour, not a failure.',
        'You decide whether to approve what it reports. That decision is the point of this beat.'
      ],
      fr: [
        "Envoyez l'invite de création validée et observez la surface du canevas apparaître à côté de la conversation.",
        "L'invite oblige l'agent à énumérer chaque dépendance et à attendre. Signaler une dépendance est un comportement correct, pas un échec.",
        "C'est à vous d'approuver ou non ce qui est signalé. Cette décision est la raison d'être de ce temps d'arrêt."
      ]
    },
    notes: {
      en: 'Human review moves ahead of first execution here, while the deeper review stays in section 5. Prompt wording is a proposal that has not been rehearsed; say so. Start the abort clock when the prompt is sent.',
      fr: "La révision humaine passe ici avant la première exécution, tandis que l'examen approfondi reste en section 5. La formulation de l'invite est une proposition non répétée; dites-le. Démarrez le chronomètre d'abandon à l'envoi de l'invite."
    }
  },
  {
    id: '08',
    translationKey: 'slide-08',
    sectionId: 'section-03',
    labId: 'lab-01-create-canvas',
    durationMinutes: { en: 20, fr: 23 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas, SOURCES.quickstart],
    title: {
      en: 'Lab 01: Build and Inspect',
      fr: 'Atelier 01 : Créer et examiner'
    },
    body: {
      en: [
        'Add one task through the interface. Your total goes up by exactly one and the new task shows a unique identifier.',
        'Ask the agent to read the board. It should report the identifier and counts you can see on screen.',
        'Ask the agent to move one task. Source status drops by one, destination rises by one, the total is unchanged.'
      ],
      fr: [
        "Ajoutez une tâche par l'interface. Votre total augmente d'exactement un et la nouvelle tâche affiche un identifiant unique.",
        "Demandez à l'agent de lire le tableau. Il doit rapporter l'identifiant et les compteurs visibles à l'écran.",
        "Demandez à l'agent de déplacer une tâche. L'état source perd un, l'état cible gagne un, le total ne change pas."
      ]
    },
    notes: {
      en: 'Longest pause in the session and the one the abort thresholds govern. Switch a blocked learner to the reference board rather than debugging in place; a facilitator debugging one machine is not running the workshop. French carries three extra minutes here.',
      fr: "Pause la plus longue de la séance et celle que régissent les seuils d'abandon. Basculez une personne bloquée vers le tableau de référence plutôt que de déboguer sur place; une personne qui dépanne une machine n'anime plus l'atelier. Le français dispose ici de trois minutes de plus."
    }
  },
  {
    id: '09',
    translationKey: 'slide-09',
    sectionId: 'section-04',
    labId: null,
    durationMinutes: { en: 3, fr: 3 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas],
    title: {
      en: 'Ask for One Improvement',
      fr: 'Demander une amélioration'
    },
    body: {
      en: [
        'One bounded change per request. A priority filter, and nothing else.',
        'State the acceptance criterion before you ask, not after you see the result.',
        'Stored data must not change. That invariant is what you are really testing.'
      ],
      fr: [
        'Un seul changement circonscrit par demande. Un filtre de priorité, et rien d\'autre.',
        "Énoncez le critère d'acceptation avant de demander, pas après avoir vu le résultat.",
        "Les données stockées ne doivent pas changer. C'est cet invariant que vous testez réellement."
      ]
    },
    notes: {
      en: 'Resist the urge to batch requests. A bundled change makes every later discrepancy ambiguous, which is the habit this section is teaching against.',
      fr: "Résistez à la tentation de regrouper les demandes. Un changement groupé rend tout écart ultérieur ambigu, et c'est précisément l'habitude que cette section combat."
    }
  },
  {
    id: '10',
    translationKey: 'slide-10',
    sectionId: 'section-04',
    labId: 'lab-02-refine-canvas',
    durationMinutes: { en: 9, fr: 9 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas],
    title: {
      en: 'Lab 02: Refine the Canvas',
      fr: 'Atelier 02 : Améliorer le canevas'
    },
    body: {
      en: [
        'Apply the filter. Visible count is at most the total, and the total itself is unchanged.',
        'Clear the filter. The previous visible count returns exactly.',
        'Reach every new control from the keyboard and confirm focus stays visible.'
      ],
      fr: [
        'Appliquez le filtre. Le nombre visible est au plus égal au total, et le total lui-même ne change pas.',
        'Retirez le filtre. Le nombre visible précédent revient exactement.',
        'Atteignez chaque nouvelle commande au clavier et vérifiez que le focus reste visible.'
      ]
    },
    notes: {
      en: 'Lab pause. Intermediate learners take the stretch bar: add an edge-case check for an empty result set and act as the reviewer for their paired beginner. A keyboard spot check is not an accessibility conformance claim.',
      fr: "Pause atelier. Les personnes de niveau intermédiaire visent le seuil avancé : ajouter une vérification de cas limite pour un résultat vide et réviser le travail de la personne débutante qui leur est jumelée. Une vérification ponctuelle au clavier ne constitue pas une déclaration de conformité."
    }
  },
  {
    id: '11',
    translationKey: 'slide-11',
    sectionId: 'section-04',
    labId: null,
    durationMinutes: { en: 3, fr: 3 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas, SOURCES.slashCommands],
    title: {
      en: 'Checkpoint and Recovery',
      fr: 'Vérification et reprise'
    },
    body: {
      en: [
        'Compare expected against actual, one difference at a time.',
        'Recovery preserves your last observed state and asks for a targeted correction.',
        'Rebuilding the board is not an undo. It discards the evidence you were about to read.'
      ],
      fr: [
        "Comparez l'attendu et l'observé, un écart à la fois.",
        'La reprise conserve votre dernier état observé et demande une correction ciblée.',
        'Reconstruire le tableau ne constitue pas une annulation. Cela détruit la preuve que vous alliez examiner.'
      ]
    },
    notes: {
      en: 'Demonstrate only a recovery path that has been rehearsed on the delivery version. An unrehearsed recovery demonstration that fails in front of the room costs more than skipping it.',
      fr: "Ne démontrez qu'un chemin de reprise déjà répété sur la version utilisée. Une démonstration non répétée qui échoue devant le groupe coûte plus cher que son omission."
    }
  },
  {
    id: '12',
    translationKey: 'slide-12',
    sectionId: 'section-05',
    labId: null,
    durationMinutes: { en: 4, fr: 3 },
    image: null,
    alt: null,
    sources: [SOURCES.quickstart, SOURCES.appOverview],
    title: {
      en: 'Review Before Sharing',
      fr: 'Vérifier avant de partager'
    },
    body: {
      en: [
        'Read the Changes view yourself: files, dependencies, network calls, and paths.',
        'Task titles are data. Confirm they render as text and never as markup or instructions.',
        'Prompt wording is not a security control. Inherited skills and tool approvals still apply.'
      ],
      fr: [
        'Lisez vous-même la vue des modifications : fichiers, dépendances, appels réseau et chemins.',
        'Les titres de tâches sont des données. Vérifiez qu\'ils s\'affichent comme du texte, jamais comme du balisage ou des instructions.',
        "La formulation d'une invite n'est pas un contrôle de sécurité. Les compétences héritées et les autorisations d'outils continuent de s'appliquer."
      ]
    },
    notes: {
      en: 'The public-code warning applies to generated output even where a blocking policy is in force. Say that plainly rather than implying the policy removes the review obligation.',
      fr: "L'avertissement sur le code public s'applique au contenu généré même lorsqu'une politique de blocage est active. Dites-le clairement plutôt que de laisser croire que la politique supprime l'obligation de révision."
    }
  },
  {
    id: '13',
    translationKey: 'slide-13',
    sectionId: 'section-05',
    labId: 'lab-03-verify-share',
    durationMinutes: { en: 8, fr: 5 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas, SOURCES.quickstart],
    title: {
      en: 'Lab 03: Verify and Decide',
      fr: 'Atelier 03 : Vérifier et décider'
    },
    body: {
      en: [
        'Confirm your invariants still hold after every change you made today.',
        'Find the persistence path the board reports and read what it actually saves.',
        'Decide whether the validation the agent generated is evidence you would accept.'
      ],
      fr: [
        'Confirmez que vos invariants tiennent toujours après tous les changements de la journée.',
        'Trouvez le chemin de persistance indiqué par le tableau et lisez ce qu\'il enregistre réellement.',
        "Jugez si la validation générée par l'agent constitue une preuve que vous accepteriez."
      ]
    },
    notes: {
      en: 'English runs the reopen-and-restore checkpoint only if it was rehearsed on the delivery version. French drops that checkpoint entirely and runs five minutes shorter here, which is where section 3 gets its extra time. No official source documents reopening behaviour, so no guarantee is offered in either language.',
      fr: "En anglais, le point de contrôle de réouverture n'est exécuté que s'il a été répété sur la version utilisée. En français, ce point est retiré et la section dure cinq minutes de moins, ce qui finance le temps supplémentaire de la section 3. Aucune source officielle ne documente la réouverture, donc aucune garantie n'est offerte dans l'une ou l'autre langue."
    }
  },
  {
    id: '14',
    translationKey: 'slide-14',
    sectionId: 'section-05',
    labId: null,
    durationMinutes: { en: 3, fr: 2 },
    image: null,
    alt: null,
    sources: [SOURCES.canvas, SOURCES.appOverview],
    title: {
      en: 'User Scope, Project Scope, and the Public Site',
      fr: 'Portée utilisateur, portée projet et site public'
    },
    body: {
      en: [
        'A project-scoped extension lives with the repository. A user-scoped one follows the person.',
        'Sharing extension source and sharing board state are two separate decisions.',
        'A repository canvas is not a published web application, and this site is not your board.'
      ],
      fr: [
        "Une extension à portée projet vit avec le dépôt. Une extension à portée utilisateur suit la personne.",
        "Partager le code de l'extension et partager l'état du tableau sont deux décisions distinctes.",
        "Un canevas de dépôt n'est pas une application web publiée, et ce site n'est pas votre tableau."
      ]
    },
    notes: {
      en: 'Project-scoped sharing through a repository does not establish live multi-user collaboration. Local files do not establish on-device inference, data residency, or retention guarantees.',
      fr: "Le partage à portée projet via un dépôt n'établit pas une collaboration multiutilisateur en temps réel. Des fichiers locaux n'établissent ni inférence sur l'appareil, ni résidence des données, ni garantie de conservation."
    }
  },
  {
    id: '15',
    translationKey: 'slide-15',
    sectionId: 'section-06',
    labId: null,
    durationMinutes: { en: 3, fr: 3 },
    image: null,
    alt: null,
    sources: [SOURCES.appOverview, SOURCES.canvas],
    title: {
      en: 'Recap and Next Step',
      fr: 'Bilan et prochaine étape'
    },
    body: {
      en: [
        'Name one result you verified yourself and one limit you actually hit.',
        'State what was never tested today, including anything the room did not reach.',
        'Choose one next step that stays inside the approvals you already have.'
      ],
      fr: [
        'Nommez un résultat que vous avez vérifié vous-même et une limite réellement rencontrée.',
        "Dites ce qui n'a pas été testé aujourd'hui, y compris ce que le groupe n'a pas atteint.",
        'Choisissez une prochaine étape qui reste dans le cadre des approbations déjà obtenues.'
      ]
    },
    notes: {
      en: 'Close on limits rather than a success claim. If the cohort ran on the reference board, say so; a guided run is a legitimate outcome and misreporting it corrupts the next session\'s pacing.',
      fr: "Terminez sur les limites plutôt que sur une déclaration de réussite. Si le groupe a travaillé sur le tableau de référence, dites-le; une séance guidée est un résultat légitime et le taire fausse le rythme de la prochaine séance."
    }
  },
  {
    id: '16',
    translationKey: 'slide-16',
    sectionId: 'section-06',
    labId: null,
    durationMinutes: { en: 2, fr: 2 },
    image: null,
    alt: null,
    sources: [
      SOURCES.appOverview,
      SOURCES.quickstart,
      SOURCES.canvas,
      SOURCES.sessions,
      SOURCES.customization,
      SOURCES.slashCommands
    ],
    title: {
      en: 'Questions and Sources',
      fr: 'Questions et sources'
    },
    body: {
      en: [
        'Every product claim in this deck traces to an official documentation page.',
        'Retrieval dates are recorded in the notes. They are not publication dates.',
        'Unanswered questions are welcome and are better than a confident guess.'
      ],
      fr: [
        'Chaque affirmation produit de ce diaporama renvoie à une page de documentation officielle.',
        'Les dates de consultation figurent dans les notes. Ce ne sont pas des dates de publication.',
        "Les questions sans réponse sont bienvenues et valent mieux qu'une supposition assurée."
      ]
    },
    notes: {
      en: `Sources retrieved ${SOURCE_RETRIEVAL_DATE}. Product behaviour changes at close to a daily cadence, so re-check versions and labels within the week before delivery. No tested app version is recorded yet because no rehearsal has taken place; do not state one.`,
      fr: `Sources consultées le ${SOURCE_RETRIEVAL_DATE}. Le comportement du produit évolue à une cadence quasi quotidienne : revérifiez les versions et les libellés dans la semaine précédant la séance. Aucune version testée n'est consignée, faute de répétition; n'en annoncez aucune.`
    }
  }
];

export default { sections, slides, SLIDE_GROUPS, LAB_SLUGS, AGENDA_TOTAL_MINUTES };
