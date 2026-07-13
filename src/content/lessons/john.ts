import { definePassage, type GospelLesson, type MediaCredit } from '../types.ts';

const pilotCredit = (title: string, sourceUrl: string): MediaCredit => ({
  sourceName: 'HRE4M John Pilot local media library',
  sourceUrl,
  creator: 'HRE4M Interactive Learning Hub',
  licence: 'CC BY 4.0',
  licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
  attribution: `“${title},” HRE4M Interactive Learning Hub, CC BY 4.0.`,
});

export const johnLesson: GospelLesson = {
  id: 'gospel-john',
  shortName: 'John',
  title: 'Gospel of John: Signs, Glory & Life',
  eyebrow: 'Unit 2 · Scripture Laboratory',
  subtitle: 'Read beneath the surface. Follow John’s signs and symbols toward the identity of Jesus.',
  symbol: '✦',
  theme: {
    name: 'Luminous Manuscript',
    motif: 'Light · Word · Signs · Glory',
    colors: {
      background: '#f5f2e9',
      surface: '#fffdf8',
      primary: '#18234d',
      secondary: '#435b91',
      accent: '#c58b2b',
      text: '#17203c',
      muted: '#69718a',
      border: '#ded8c8',
    },
  },
  gospelLens: [
    'Notice signs that reveal who Jesus is rather than treating them as spectacle.',
    'Track contrasts: light and darkness, belief and unbelief, sight and blindness.',
    'Listen for symbols such as water, bread, vine, shepherd, life, and glory.',
    'Ask how the Cross becomes the hour when Jesus’ self-giving love is revealed.',
  ],
  passages: [
    definePassage({
      id: 'john-1-word',
      title: 'The Word Becomes Flesh',
      reference: 'John 1:1–18',
      difficulty: 'Challenge',
      estimatedMinutes: 18,
      anchorPhrase: 'The eternal Word enters human history.',
      contextNotes: [
        'John opens with a theological prologue rather than a birth narrative.',
        'The images of Word, light, life, witness, and glory introduce themes that return throughout the Gospel.',
      ],
      keyImages: ['Word', 'light', 'life', 'flesh', 'glory'],
      catholicConnection:
        'The passage grounds Catholic belief in the Incarnation: the eternal Son truly shares human life. It also shapes the language of the Creed and the Church’s sacramental vision of God meeting us through creation.',
      eisegesisTrap:
        'Do not treat “spiritual” as the opposite of embodied human life. John insists that the Word truly becomes flesh.',
      teacherNote:
        'Invite students to list every title or image for Jesus before they interpret any one of them.',
      pilot: {
        featureFlag: 'john-media-pilot',
        label: 'John media pilot · 1 of 3',
        openBibleInstruction:
          'Read the whole prologue once without stopping. On a second reading, circle Word, light, life, witness, receive, flesh, and glory. Use the approved classroom Bible; the activity intentionally does not reproduce the passage.',
        evidenceChecks: [
          { id: 'john1-sequence', label: 'I traced the movement from the Word before creation to the Word entering human history.' },
          { id: 'john1-contrast', label: 'I identified one light/darkness or receive/reject contrast and its location.' },
          { id: 'john1-witness', label: 'I distinguished what the prologue says about the Word from what it says about John the witness.' },
          { id: 'john1-claim', label: 'I can point to the detail that supports my claim about “flesh,” grace, or glory.' },
        ],
      },
      media: [
        {
          id: 'john1-word-light-hook',
          type: 'image',
          placement: 'hook',
          featureFlag: 'john-media-pilot',
          title: 'From Word to Flesh: Visual Hook',
          instructionalPurpose: 'Activate prior knowledge',
          optional: false,
          description: 'A spare visual sequence introduces the prologue’s linked images without defining them for the reader.',
          textAlternative:
            'Four terms form a left-to-right sequence: WORD, LIGHT, LIFE, FLESH. The first three appear as luminous gold forms on a dark field; FLESH appears as a warm, solid human-coloured block. Ask what changes when an abstract-sounding sequence becomes embodied.',
          images: [{
            id: 'word-light-life-flesh',
            src: 'media/john1-word-light-hook.svg',
            hosting: 'local',
            alt: 'Dark blue visual with the words Word, Light, Life, and Flesh connected from left to right; the final Flesh panel is warm and solid, emphasizing embodiment.',
            width: 1200,
            height: 520,
            caption: 'Observation prompt: notice the movement before deciding what each term means in John.',
          }],
          observationPrompts: [{ id: 'movement', prompt: 'What changes across the four visual terms, and which change should you test against John 1:1–18?' }],
          afterViewing: [{ id: 'opening-hypothesis', prompt: 'Write one tentative hypothesis: why might John join cosmic language to the concrete word “flesh”?' }],
          credit: pilotCredit('From Word to Flesh: Visual Hook', 'media/john1-word-light-hook.svg'),
        },
        {
          id: 'john1-prologue-pattern',
          type: 'image',
          placement: 'study',
          featureFlag: 'john-media-pilot',
          title: 'John 1 Prologue: Movement and Response Map',
          instructionalPurpose: 'Prompt textual evidence',
          optional: false,
          description: 'A literary map helps students follow the prologue’s movement without replacing the biblical text.',
          textAlternative:
            'A five-part map moves through pre-existence and creation, light and life, witness, reception or rejection, and the Word becoming flesh and revealing God. Arrows show that the prologue alternates claims about Jesus with human responses. The map gives verse ranges only, not the passage text.',
          beforeViewing: [{ id: 'first-reading', prompt: 'After your first Bible reading, list two repeated images and one human response. Include verse numbers.' }],
          images: [{
            id: 'prologue-map',
            src: 'media/john1-prologue-pattern.svg',
            hosting: 'local',
            alt: 'Five-part literary map for John 1:1–18: before creation, light and life, witness, reception or rejection, and Word made flesh, connected by arrows and verse ranges.',
            width: 1200,
            height: 675,
            caption: 'Teacher-created literary map. Verse ranges guide students back to an approved Bible.',
          }],
          hotspots: [
            { id: 'witness', xPercent: 50, yPercent: 48, label: 'Witness interrupts the claims', observation: 'John the Baptist is carefully distinguished from the light; his role is testimony.' },
            { id: 'response', xPercent: 70, yPercent: 48, label: 'Response divides', observation: 'The prologue includes both rejection and reception, making response part of its argument.' },
            { id: 'embodiment', xPercent: 89, yPercent: 48, label: 'The movement becomes embodied', observation: 'The climax does not leave creation behind: the Word becomes flesh within it.' },
          ],
          observationPrompts: [{ id: 'structure', prompt: 'Where does the map alternate revelation and response? Verify one transition with a verse range.' }],
          afterViewing: [{ id: 'evidence', prompt: 'Which textual detail most strongly prevents an interpretation that treats Jesus as merely an idea or symbol?' }],
          credit: pilotCredit('John 1 Prologue: Movement and Response Map', 'media/john1-prologue-pattern.svg'),
        },
      ],
      exemplars: {
        literal:
          'John introduces Jesus as the eternal Word who was with God and is God. The prologue explains that this Word enters human history, reveals the Father, and is received by some but rejected by others.',
        allegorical:
          'The Word becoming flesh reveals the Incarnation: in Jesus, God enters creation to bring light, grace, and truth. Christ is the fullest revelation of the Father and the centre of salvation history.',
        moral:
          'The passage calls Christians to receive Christ’s light and to become truthful witnesses, especially when darkness or rejection makes faithfulness difficult.',
        anagogical:
          'The life and light offered by the Word point toward eternal communion with God, where darkness is overcome and humanity shares fully in divine life.',
      },
    }),
    definePassage({
      id: 'john-2-cana',
      title: 'The Wedding at Cana',
      reference: 'John 2:1–11',
      difficulty: 'Starter',
      estimatedMinutes: 14,
      anchorPhrase: 'An ordinary need becomes a sign of abundant grace.',
      contextNotes: [
        'This is the first event John explicitly calls a sign.',
        'The large stone jars are associated with ritual purification, while a wedding evokes covenant and celebration.',
      ],
      keyImages: ['wedding', 'water', 'wine', 'jars', 'hour'],
      catholicConnection:
        'Cana is proclaimed at weddings and invites reflection on marriage, Mary’s trust, sacramental signs, and Christ’s abundant gift of grace.',
      eisegesisTrap:
        'Avoid reducing this to a story about Jesus helping a party continue. John asks readers to see what the sign reveals about Jesus and the new covenant.',
      teacherNote:
        'Have students distinguish the visible action from the invisible reality the sign points toward.',
      media: [
        {
          id: 'cana-six-jars-observation',
          type: 'image',
          title: 'Six Stone Jars: Observation Study',
          instructionalPurpose: 'Observe a symbol',
          optional: true,
          description:
            'Use this original schematic illustration to slow down and notice the scale and symbolism of the jars before interpreting the sign.',
          textAlternative:
            'Imagine six large stone water jars arranged together. John identifies them with Jewish purification and says that each holds a substantial amount. The repeated number, material, capacity, and transformation are the key observations.',
          beforeViewing: [
            {
              id: 'prediction',
              prompt: 'Without interpreting yet, what details about the jars does John 2:6 ask you to notice?',
            },
          ],
          images: [
            {
              id: 'six-jars',
              src: 'media/cana-jars-observation.svg',
              hosting: 'local',
              alt: 'Schematic illustration of six numbered stone jars with visible water lines, arranged from left to right.',
              width: 1200,
              height: 675,
              caption: 'A text-study aid, not an archaeological reconstruction of the Cana vessels.',
            },
          ],
          hotspots: [
            {
              id: 'six-together',
              xPercent: 49,
              yPercent: 45,
              label: 'Six jars together',
              observation: 'John specifies six vessels rather than describing an unspecified supply of water.',
            },
            {
              id: 'stone-material',
              xPercent: 18,
              yPercent: 59,
              label: 'Stone material',
              observation: 'The material connects the vessels with practices of ritual purification.',
            },
            {
              id: 'large-capacity',
              xPercent: 80,
              yPercent: 58,
              label: 'Large capacity',
              observation: 'The scale helps the reader notice abundance, not merely a small private solution.',
            },
          ],
          observationPrompts: [
            {
              id: 'strongest-detail',
              prompt: 'Which visualized detail—number, material, capacity, or water—most needs textual investigation? Why?',
            },
          ],
          afterViewing: [
            {
              id: 'textual-evidence',
              prompt: 'Return to John 2:6–11. Cite one detail that could support an allegorical reading without skipping the literal sense.',
            },
          ],
          credit: {
            sourceName: 'HRE4M Interactive Learning Hub local media library',
            sourceUrl: 'media/cana-jars-observation.svg',
            creator: 'HRE4M Interactive Learning Hub',
            licence: 'CC BY 4.0',
            licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
            attribution: '“Six Stone Jars: Observation Study,” HRE4M Interactive Learning Hub, CC BY 4.0.',
          },
        },
        {
          id: 'cana-sign-motion',
          type: 'video',
          title: 'From Need to Sign: Cana in Motion',
          instructionalPurpose: 'Compare interpretations',
          optional: true,
          description:
            'Watch a short, silent Remotion sequence that traces the narrative movement from an ordinary need to abundance, belief, and revealed glory.',
          textAlternative:
            'A nine-second motion graphic opens with the words “An ordinary need becomes a sign” and identifies six stone jars holding water. The water in the jars changes to wine beneath the statement “Command becomes abundance.” The jars then give way to the conclusion “A visible sign reveals glory,” followed by the pathway Need → Trust → Abundance → Belief and the prompt “Return to the text: what does the sign reveal about Jesus?”',
          beforeViewing: [
            {
              id: 'movement-prediction',
              prompt: 'Before pressing play, predict which moment in John 2:1–11 changes an ordinary event into a sign.',
            },
          ],
          video: {
            src: 'media/cana-sign-motion.mp4',
            hosting: 'local',
            mimeType: 'video/mp4',
            silent: true,
            width: 1280,
            height: 720,
            poster: {
              src: 'media/cana-sign-poster.png',
              hosting: 'local',
            },
          },
          afterViewing: [
            {
              id: 'sign-and-glory',
              prompt: 'Which link in the sequence—need, trust, abundance, or belief—is most important for explaining how the sign reveals Jesus’ glory? Support your choice from John 2:1–11.',
            },
          ],
          credit: {
            sourceName: 'HRE4M Remotion motion library',
            sourceUrl: 'media/cana-sign-motion.mp4',
            creator: 'HRE4M Interactive Learning Hub',
            licence: 'CC BY 4.0',
            licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
            attribution: '“From Need to Sign: Cana in Motion,” HRE4M Interactive Learning Hub, CC BY 4.0.',
          },
        },
      ],
      exemplars: {
        literal:
          'At a wedding where the wine has run out, Mary brings the need to Jesus. He directs servants to fill purification jars with water, which becomes excellent wine, and his disciples begin to believe in him.',
        allegorical:
          'The abundant wine points to the joy and grace of the new covenant in Christ. The transformation also suggests how Christ fulfills and transforms earlier signs of purification.',
        moral:
          'Mary and the servants model attentive trust: they notice a need, bring it to Jesus, and act faithfully even before they understand the outcome.',
        anagogical:
          'The wedding feast and abundant wine anticipate the final banquet of God’s Kingdom, where communion and joy are complete.',
      },
    }),
    definePassage({
      id: 'john-3-nicodemus',
      title: 'Nicodemus & New Birth',
      reference: 'John 3:1–21',
      difficulty: 'Intermediate',
      estimatedMinutes: 18,
      anchorPhrase: 'A nighttime conversation opens toward new life.',
      contextNotes: [
        'Nicodemus is a respected religious leader who comes to Jesus at night.',
        'His literal misunderstanding creates space for Jesus to speak about birth through water and Spirit.',
      ],
      keyImages: ['night', 'birth', 'water', 'Spirit', 'light'],
      catholicConnection:
        'The language of water and Spirit is strongly connected with Baptism, conversion, grace, and entry into new life in Christ.',
      eisegesisTrap:
        'Avoid using one famous verse while ignoring the surrounding conversation about new birth, judgment, truth, and coming into the light.',
      teacherNote:
        'Ask students to mark where Nicodemus hears physical language but Jesus is opening a theological meaning.',
      exemplars: {
        literal:
          'Nicodemus approaches Jesus at night and recognizes him as a teacher from God. Jesus challenges him to understand a birth from above through water and Spirit, then contrasts light with the human choice for darkness.',
        allegorical:
          'The passage reveals salvation as God’s initiative in Christ and new birth through the Spirit. Catholic readers also recognize baptismal language in the joining of water and Spirit.',
        moral:
          'Nicodemus models the courage to bring questions to Jesus, while the light imagery calls believers to let their actions be seen and tested in truth.',
        anagogical:
          'New birth begins a life ordered toward eternal life with God, where judgment is understood as the final revealing of whether we chose light or darkness.',
      },
    }),
    definePassage({
      id: 'john-4-well',
      title: 'The Samaritan Woman',
      reference: 'John 4:1–42',
      difficulty: 'Intermediate',
      estimatedMinutes: 22,
      anchorPhrase: 'A boundary-crossing encounter becomes living witness.',
      contextNotes: [
        'Jewish-Samaritan tensions and gender conventions make the public conversation surprising.',
        'The woman’s titles for Jesus develop as the conversation moves from ordinary water to worship and mission.',
      ],
      keyImages: ['well', 'living water', 'thirst', 'worship', 'harvest'],
      catholicConnection:
        'The passage connects with baptismal thirst, human dignity, evangelization, and worship rooted in Spirit and truth. It is a major reading in the Church’s preparation of adults for Baptism.',
      eisegesisTrap:
        'Do not define the woman only by assumptions about her relationships. Follow John’s emphasis on revelation, honest encounter, and her growing witness.',
      teacherNote:
        'Students can trace the woman’s descriptions of Jesus and identify each change in understanding.',
      media: [
        {
          id: 'john4-recognition-motion', type: 'video', title: 'Recognition at the Well: A Growing Witness',
          instructionalPurpose: 'Prompt textual evidence', optional: true,
          description: 'Trace how the Samaritan woman’s language for Jesus develops through encounter, revelation, and witness.',
          textAlternative: 'The animation traces a sequence of titles and descriptions for Jesus across John 4: a Jew, Sir, Prophet, possible Messiah, and finally Saviour as the townspeople encounter him. It emphasizes that recognition grows through conversation and becomes public witness. It ends by asking what changes and what causes the change.',
          beforeViewing: [{ id: 'title-change', prompt: 'Which title or description for Jesus changes most significantly across John 4?' }],
          afterViewing: [{ id: 'witness-evidence', prompt: 'What detail in the conversation best explains the movement from private encounter to public witness?' }],
          video: { src: 'media/john4-recognition-motion.mp4', hosting: 'local', mimeType: 'video/mp4', silent: true, width: 1280, height: 720, poster: { src: 'media/john4-recognition-poster.png', hosting: 'local' } },
          credit: { sourceName: 'HRE4M Remotion motion library', sourceUrl: 'media/john4-recognition-motion.mp4', creator: 'HRE4M Interactive Learning Hub', licence: 'CC BY 4.0', licenceUrl: 'https://creativecommons.org/licenses/by/4.0/', attribution: 'Recognition at the Well: A Growing Witness by HRE4M Interactive Learning Hub, licensed CC BY 4.0.' },
        },
      ],
      exemplars: {
        literal:
          'Jesus speaks with a Samaritan woman at Jacob’s well, asks for water, and gradually reveals knowledge of her life and his identity. She brings others from her town, who then encounter Jesus themselves.',
        allegorical:
          'Jesus is the source of living water, the Spirit-filled life that satisfies humanity’s deepest thirst. Her movement from encounter to witness also reflects the Church’s missionary calling.',
        moral:
          'The passage calls disciples to cross social boundaries, speak truth without contempt, and help others encounter Christ rather than drawing attention only to themselves.',
        anagogical:
          'Living water points to eternal life and to the final gathering of people from divided communities into worship of God in Spirit and truth.',
      },
    }),
    definePassage({
      id: 'john-6-bread',
      title: 'Bread of Life',
      reference: 'John 6:1–15, 25–59',
      difficulty: 'Challenge',
      estimatedMinutes: 25,
      anchorPhrase: 'Physical hunger opens into the mystery of Christ’s self-gift.',
      contextNotes: [
        'The feeding occurs near Passover and echoes Israel’s wilderness story and manna.',
        'The crowd seeks more bread, while Jesus redirects attention from the gift to the giver.',
      ],
      keyImages: ['bread', 'hunger', 'manna', 'Passover', 'life'],
      catholicConnection:
        'John 6 is central to Catholic Eucharistic faith: Jesus gives himself as true food and gathers the Church into communion through his sacrificial self-gift.',
      eisegesisTrap:
        'Avoid reducing the passage either to physical charity alone or to an idea with no concern for bodily hunger. John holds sign, compassion, faith, and Eucharistic meaning together.',
      teacherNote:
        'Have students compare what the crowd wants with what Jesus says he gives.',
      pilot: {
        featureFlag: 'john-media-pilot',
        label: 'John media pilot · 2 of 3',
        openBibleInstruction:
          'Read John 6:1–15, then 25–59. Mark Passover, bread, hunger, seek, believe, give, eat, life, and raise. Draw a line between the feeding sign and any later statement that interprets it.',
        evidenceChecks: [
          { id: 'john6-passover', label: 'I located the Passover setting and explained why it matters to the sign.' },
          { id: 'john6-crowd', label: 'I compared what the crowd seeks with what Jesus says they should seek.' },
          { id: 'john6-manna', label: 'I identified how the manna comparison develops rather than merely repeating the wilderness story.' },
          { id: 'john6-give-raise', label: 'I cited language about Jesus giving himself or raising believers on the last day.' },
        ],
      },
      media: [
        {
          id: 'john6-bread-sign-hook',
          type: 'image',
          placement: 'hook',
          featureFlag: 'john-media-pilot',
          title: 'Enough, Left Over, Still Hungry?',
          instructionalPurpose: 'Activate prior knowledge',
          optional: false,
          description: 'A visual tension between scarcity, abundance, and continued seeking prepares students to ask what kind of hunger John 6 explores.',
          textAlternative:
            'A small cluster of five loaves and two fish sits on the left. Twelve outlined baskets fill the centre. On the right, a crowd-shaped field contains an empty question mark. The sequence asks why people who have eaten still seek Jesus.',
          images: [{
            id: 'bread-sign-sequence',
            src: 'media/john6-bread-sign-hook.svg',
            hosting: 'local',
            alt: 'Visual sequence of five loaves and two fish, twelve filled baskets, and a crowd silhouette containing a question mark, connected by arrows.',
            width: 1200,
            height: 520,
            caption: 'The quantities come from the narrative; the question mark represents the crowd’s unresolved hunger.',
          }],
          observationPrompts: [{ id: 'surprise', prompt: 'Which part of the sequence is most surprising after the crowd has eaten, and why?' }],
          afterViewing: [{ id: 'hunger-hypothesis', prompt: 'What kind of hunger might remain after physical abundance? Keep your answer tentative until you read the discourse.' }],
          credit: pilotCredit('Enough, Left Over, Still Hungry?', 'media/john6-bread-sign-hook.svg'),
        },
        {
          id: 'john6-discourse-map',
          type: 'image',
          placement: 'study',
          featureFlag: 'john-media-pilot',
          title: 'Bread of Life: Sign-to-Discourse Map',
          instructionalPurpose: 'Compare interpretations',
          optional: false,
          description: 'A relationship map connects the feeding, Passover and manna context, the crowd’s questions, Jesus’ self-identification, and resurrection hope.',
          textAlternative:
            'A central bread symbol connects to five labelled regions: feeding sign, Passover setting, manna comparison, Jesus as giver and gift, and eternal life or resurrection. A lower path contrasts “seeking another sign” with “believing and receiving.” Verse ranges point back to John 6.',
          beforeViewing: [{ id: 'first-reading', prompt: 'After reading both sections, name one way the discourse interprets the feeding. Cite a word or phrase and its verse.' }],
          images: [{
            id: 'bread-discourse-map',
            src: 'media/john6-bread-of-life-map.svg',
            hosting: 'local',
            alt: 'Concept map linking the feeding sign to Passover, manna, Jesus as giver and gift, the crowd’s response, and resurrection on the last day, with John 6 verse ranges.',
            width: 1200,
            height: 675,
            caption: 'The map holds bodily hunger, belief, Eucharistic self-gift, and resurrection together.',
          }],
          hotspots: [
            { id: 'passover', xPercent: 24, yPercent: 27, label: 'Passover frame', observation: 'The timing invites readers to hear exodus, manna, sacrifice, and covenant echoes.' },
            { id: 'giver-gift', xPercent: 51, yPercent: 48, label: 'Giver and gift', observation: 'Jesus redirects attention from receiving bread to receiving the one who gives himself.' },
            { id: 'last-day', xPercent: 79, yPercent: 27, label: 'Last-day horizon', observation: 'Repeated resurrection language keeps the discourse aimed beyond immediate hunger.' },
          ],
          observationPrompts: [{ id: 'connections', prompt: 'Choose one connecting line on the map. What verses justify that connection, and what would be lost if the line were removed?' }],
          afterViewing: [{ id: 'both-and', prompt: 'How does John 6 hold concern for bodily hunger together with belief, self-gift, Eucharistic meaning, or resurrection?' }],
          credit: pilotCredit('Bread of Life: Sign-to-Discourse Map', 'media/john6-bread-of-life-map.svg'),
        },
      ],
      exemplars: {
        literal:
          'Jesus feeds a large crowd from a small amount of food. When the crowd seeks him again, he challenges their motives and identifies himself as the bread that gives lasting life.',
        allegorical:
          'The feeding and discourse reveal Jesus as the fulfillment of manna and Passover. Catholic interpretation sees a deep Eucharistic meaning in Christ giving his own life as food for the world.',
        moral:
          'Disciples are called to offer what they have, trust Christ with human need, and seek a relationship with the giver rather than only the benefits they want.',
        anagogical:
          'The bread that gives eternal life anticipates resurrection and the heavenly banquet, where hunger for God is finally fulfilled.',
      },
    }),
    definePassage({
      id: 'john-9-sight',
      title: 'Light of the World',
      reference: 'John 9:1–41',
      difficulty: 'Intermediate',
      estimatedMinutes: 22,
      anchorPhrase: 'A healing exposes deeper forms of blindness.',
      contextNotes: [
        'Jesus rejects the claim that the man’s blindness proves personal guilt.',
        'As the healed man sees more clearly who Jesus is, several sighted characters become more resistant.',
      ],
      keyImages: ['light', 'sight', 'blindness', 'washing', 'testimony'],
      catholicConnection:
        'The Church has long connected this passage with baptismal illumination, conversion, truthful witness, and rejecting easy judgments about suffering.',
      eisegesisTrap:
        'Avoid assuming disability or suffering is punishment for personal sin. Jesus directly interrupts that explanation at the start of the story.',
      teacherNote:
        'Build two columns: physical sight and spiritual sight. Track which characters move in each direction.',
      pilot: {
        featureFlag: 'john-media-pilot',
        label: 'John media pilot · 3 of 3',
        openBibleInstruction:
          'Read John 9:1–41 as a sequence of scenes. In the margin, note who asks each question, what name or title is used for Jesus, and whether each speaker becomes more open or more resistant.',
        evidenceChecks: [
          { id: 'john9-suffering', label: 'I recorded how Jesus responds to the disciples’ assumption about sin and blindness.' },
          { id: 'john9-titles', label: 'I traced at least three changes in the healed man’s language about Jesus.' },
          { id: 'john9-questioners', label: 'I distinguished neighbours, parents, authorities, the healed man, and Jesus across the scenes.' },
          { id: 'john9-reversal', label: 'I cited evidence for the final reversal between physical sight and spiritual blindness.' },
        ],
      },
      media: [
        {
          id: 'john9-sight-hook',
          type: 'image',
          placement: 'hook',
          featureFlag: 'john-media-pilot',
          title: 'Seeing Is Not Yet Understanding',
          instructionalPurpose: 'Activate prior knowledge',
          optional: false,
          description: 'An eye chart that becomes less legible as certainty increases introduces John’s irony about sight and blindness.',
          textAlternative:
            'An eye-shaped field contains three statements: “I see,” “I know,” and “I understand.” The first is sharp, the second partly obscured, and the third almost hidden. The image asks whether physical vision, certainty, and understanding are the same.',
          images: [{
            id: 'seeing-understanding',
            src: 'media/john9-sight-hook.svg',
            hosting: 'local',
            alt: 'Stylized eye containing the phrases I see, I know, and I understand; each phrase becomes progressively more obscured despite appearing more certain.',
            width: 1200,
            height: 520,
            caption: 'John 9 repeatedly separates the ability to see from the willingness to understand.',
          }],
          observationPrompts: [{ id: 'difference', prompt: 'What is the difference between seeing, knowing, and understanding in this visual?' }],
          afterViewing: [{ id: 'irony-hypothesis', prompt: 'Predict how a story about restored eyesight could expose another kind of blindness.' }],
          credit: pilotCredit('Seeing Is Not Yet Understanding', 'media/john9-sight-hook.svg'),
        },
        {
          id: 'john9-testimony-map',
          type: 'image',
          placement: 'study',
          featureFlag: 'john-media-pilot',
          title: 'John 9: Sight and Resistance Across the Scenes',
          instructionalPurpose: 'Prompt textual evidence',
          optional: false,
          description: 'A scene-by-scene trajectory compares the healed man’s growing testimony with the authorities’ growing resistance.',
          textAlternative:
            'Two paths cross over seven scenes. The healed man’s path rises from “the man called Jesus” toward testimony and worship. The authorities’ path falls from investigation toward exclusion and claimed certainty. Neighbours and parents remain between the paths. Verse ranges label each scene.',
          beforeViewing: [{ id: 'first-reading', prompt: 'After your first reading, identify one character who changes and one who resists change. Cite the scene or verses.' }],
          images: [{
            id: 'sight-resistance-map',
            src: 'media/john9-sight-testimony-map.svg',
            hosting: 'local',
            alt: 'Seven-scene trajectory for John 9 with the healed man’s testimony rising toward worship while the authorities’ resistance falls toward exclusion; neighbours and parents occupy the middle.',
            width: 1200,
            height: 675,
            caption: 'The crossing paths visualize John’s narrative reversal; students must verify each point in the text.',
          }],
          hotspots: [
            { id: 'assumption', xPercent: 14, yPercent: 51, label: 'Opening assumption', observation: 'The story begins by interrupting an easy equation between disability and personal guilt.' },
            { id: 'testimony', xPercent: 58, yPercent: 38, label: 'Testimony under pressure', observation: 'Repeated questioning sharpens rather than erases the healed man’s testimony.' },
            { id: 'reversal', xPercent: 87, yPercent: 50, label: 'Final reversal', observation: 'The person once physically blind moves toward worship while confident authorities are named as blind.' },
          ],
          observationPrompts: [{ id: 'turning-point', prompt: 'Where do the two trajectories most clearly cross? Identify the verse-level evidence for that turning point.' }],
          afterViewing: [{ id: 'judgment', prompt: 'How does the narrative challenge both victim-blaming and the claim that certainty always equals insight?' }],
          credit: pilotCredit('John 9: Sight and Resistance Across the Scenes', 'media/john9-sight-testimony-map.svg'),
        },
      ],
      exemplars: {
        literal:
          'Jesus heals a man blind from birth, who washes and returns able to see. Questioning by neighbours, family, and authorities becomes a conflict over Jesus’ identity, while the man grows bolder in his testimony.',
        allegorical:
          'The healing acts as a sign that Christ brings spiritual illumination. Washing and new sight also echo the Church’s baptismal language of enlightenment.',
        moral:
          'The healed man teaches courage in truthful witness, while the interrogators warn against pride that refuses evidence because it threatens established certainty.',
        anagogical:
          'Christ’s light points toward the final unveiling of truth, when hidden blindness is exposed and creation is healed in God’s presence.',
      },
    }),
    definePassage({
      id: 'john-10-shepherd',
      title: 'The Good Shepherd',
      reference: 'John 10:1–18',
      difficulty: 'Starter',
      estimatedMinutes: 15,
      anchorPhrase: 'The true shepherd knows, protects, and gives his life.',
      contextNotes: [
        'The shepherd discourse follows the conflict over the man born blind.',
        'Biblical shepherd imagery can describe both God’s care and the responsibility of leaders.',
      ],
      keyImages: ['shepherd', 'gate', 'voice', 'flock', 'self-gift'],
      catholicConnection:
        'The passage shapes Catholic reflection on pastoral leadership, vocation, unity, and Christ’s freely offered sacrifice for the flock.',
      eisegesisTrap:
        'Do not turn the sheep image into permission for passive or uncritical following. The passage distinguishes Christ’s trustworthy voice from exploitative leadership.',
      teacherNote:
        'Invite students to derive criteria for trustworthy leadership from the actions of the shepherd.',
      exemplars: {
        literal:
          'Jesus contrasts a true shepherd, who enters rightly and knows the sheep, with thieves and hired workers. He describes himself as both gate and shepherd who freely lays down his life.',
        allegorical:
          'Jesus gathers and protects God’s people, and his self-offering anticipates the Cross. The one flock also points to the unity Christ desires for the Church and humanity.',
        moral:
          'Christians are called to learn the voice of the good shepherd and to lead others through knowledge, protection, service, and self-giving rather than control.',
        anagogical:
          'The secure pasture and gathered flock anticipate final communion with God, where division, danger, and death no longer scatter God’s people.',
      },
    }),
    definePassage({
      id: 'john-11-lazarus',
      title: 'The Raising of Lazarus',
      reference: 'John 11:1–44',
      difficulty: 'Intermediate',
      estimatedMinutes: 24,
      anchorPhrase: 'Grief and delay become a sign of resurrection life.',
      contextNotes: [
        'Jesus’ delay creates tension, yet the story never dismisses the real grief of Martha, Mary, and the community.',
        'The sign leads some to belief and also accelerates the plot against Jesus.',
      ],
      keyImages: ['tomb', 'tears', 'stone', 'voice', 'unbinding'],
      catholicConnection:
        'The passage speaks to Christian hope at funerals, the resurrection of the body, compassionate presence in grief, and the Paschal Mystery.',
      eisegesisTrap:
        'Avoid using resurrection hope to minimize grief. Jesus shares the mourners’ sorrow before calling Lazarus from the tomb.',
      teacherNote:
        'Ask what the passage reveals through Jesus’ words, actions, emotions, and relationships—not only through the miracle.',
      exemplars: {
        literal:
          'After Lazarus dies, Jesus meets Martha and Mary, shares the community’s grief, prays, and calls Lazarus from the tomb. The sign deepens belief for some and opposition for others.',
        allegorical:
          'Jesus reveals himself as resurrection and life. Lazarus leaving the tomb anticipates Christ’s victory over death, while the command to unbind him suggests the community’s role in restored life.',
        moral:
          'Disciples are called to remain present in grief, confess hope honestly, and help remove the bonds that keep others from living freely.',
        anagogical:
          'The opened tomb points directly toward the resurrection of the dead and the final defeat of death in eternal communion with God.',
      },
    }),
    definePassage({
      id: 'john-15-vine',
      title: 'Vine & Branches',
      reference: 'John 15:1–17',
      difficulty: 'Starter',
      estimatedMinutes: 16,
      anchorPhrase: 'Fruitful discipleship grows through enduring communion.',
      contextNotes: [
        'Jesus speaks during the farewell discourse on the night before his death.',
        'Vine imagery recalls Israel and highlights dependence, pruning, fruit, love, and friendship.',
      ],
      keyImages: ['vine', 'branches', 'fruit', 'pruning', 'friendship'],
      catholicConnection:
        'The passage illuminates grace, prayer, Eucharistic communion, Christian friendship, vocation, and the Church’s shared life in Christ.',
      eisegesisTrap:
        'Avoid reading fruitfulness as worldly success. In context, fruit grows from communion with Christ and self-giving love.',
      teacherNote:
        'Ask students to identify what the branch can and cannot do by itself, then connect that to grace and human freedom.',
      exemplars: {
        literal:
          'Jesus tells his disciples that he is the vine and they are branches who must remain in him to bear fruit. He connects this abiding life with love, obedience, joy, friendship, and mission.',
        allegorical:
          'The vine images the living union between Christ and his Church. Grace flows from Christ, forming a communion that becomes fruitful through self-giving love.',
        moral:
          'Disciples should cultivate habits that keep them rooted in Christ and measure fruit by faithful love, service, prayer, and care for others.',
        anagogical:
          'Abiding in Christ anticipates unbroken communion with God, when joy is complete and every life-giving relationship reaches its fulfillment.',
      },
    }),
    definePassage({
      id: 'john-18-20-hour',
      title: 'The Hour of Glory',
      reference: 'John 18–20 (selected passages)',
      difficulty: 'Challenge',
      estimatedMinutes: 30,
      anchorPhrase: 'The Cross reveals a king whose power is self-giving love.',
      contextNotes: [
        'John presents Jesus with striking agency through arrest, trial, Crucifixion, and burial.',
        'Resurrection scenes focus on recognition, peace, forgiveness, wounds, witness, and mission.',
      ],
      keyImages: ['king', 'Cross', 'garden', 'wounds', 'breath'],
      catholicConnection:
        'These chapters stand at the heart of the Paschal Mystery, Holy Week, the sacraments, reconciliation, resurrection faith, and the Church’s mission.',
      eisegesisTrap:
        'Avoid blaming the Jewish people collectively for Jesus’ death. Read the Passion with historical care and the Church’s rejection of antisemitism.',
      teacherNote:
        'Use selected scenes and ask students how John redefines glory, kingship, victory, and belief.',
      exemplars: {
        literal:
          'Jesus is arrested, questioned, condemned, crucified, and buried. On the first day of the week, the empty tomb and encounters with the risen Jesus move disciples from grief and fear toward belief and mission.',
        allegorical:
          'The Cross is the completion of Jesus’ loving self-gift and the place where his kingship is paradoxically revealed. Resurrection and the gift of the Spirit create a reconciled, witnessing community.',
        moral:
          'The Passion calls disciples to courageous truth, faithful presence, forgiveness, and a mission that does not hide wounds but allows grace to transform them.',
        anagogical:
          'The garden and first-day imagery signal new creation. Christ’s resurrection promises the defeat of death and humanity’s final participation in God’s life.',
      },
    }),
  ],
  quiz: [
    {
      id: 'john-q1',
      statement: 'John 9 challenges the assumption that the man’s blindness was caused by his personal sin.',
      answer: 'Exegesis',
      feedback: 'This conclusion follows Jesus’ response and the passage’s own argument.',
    },
    {
      id: 'john-q2',
      statement: 'John 6 is only a lesson about sharing food fairly.',
      answer: 'Eisegesis',
      feedback: 'Sharing matters, but “only” ignores Passover, manna, belief, and the Bread of Life discourse.',
    },
    {
      id: 'john-q3',
      statement: 'The wedding setting and purification jars can help explain what the Cana sign communicates.',
      answer: 'Exegesis',
      feedback: 'This uses literary and historical details inside the passage to interpret the sign.',
    },
    {
      id: 'john-q4',
      statement: 'Because Jesus is the vine, successful Christians should always become wealthy and popular.',
      answer: 'Eisegesis',
      feedback: 'John defines fruit through abiding love and self-gift, not wealth or popularity.',
    },
    {
      id: 'john-q5',
      statement: 'Tracking how the Samaritan woman’s titles for Jesus change is a useful literary observation.',
      answer: 'Exegesis',
      feedback: 'The development is visible in the narrative and supports a contextual interpretation.',
    },
  ],
  sortingActivity: [
    { id: 'john-s1', text: 'Jesus feeds the crowd near Passover and then teaches about bread from heaven.', answer: 'Literal' },
    { id: 'john-s2', text: 'The Bread of Life reveals Christ’s Eucharistic self-gift.', answer: 'Allegorical' },
    { id: 'john-s3', text: 'Disciples should notice hunger and offer what they have in service.', answer: 'Moral' },
    { id: 'john-s4', text: 'The promised bread anticipates resurrection and the heavenly banquet.', answer: 'Anagogical' },
    { id: 'john-s5', text: 'The healed man is questioned and gradually speaks more boldly about Jesus.', answer: 'Literal' },
    { id: 'john-s6', text: 'Washing and sight suggest baptismal illumination in Christ.', answer: 'Allegorical' },
    { id: 'john-s7', text: 'The witness teaches courage when truthful testimony has a cost.', answer: 'Moral' },
    { id: 'john-s8', text: 'Christ’s light points to the final unveiling of all truth.', answer: 'Anagogical' },
  ],
};
