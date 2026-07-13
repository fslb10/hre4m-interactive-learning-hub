import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  Sequence,
  Solid,
  interpolate,
  useCurrentFrame,
} from 'remotion';

type Palette = {
  background: string;
  ink: string;
  accent: string;
  secondary: string;
  muted: string;
};

const shared: Palette = {background: '#f4efe4', ink: '#18234d', accent: '#a16d23', secondary: '#b96d57', muted: '#696774'};
const john: Palette = {background: '#eef1ed', ink: '#172b3b', accent: '#a06b2b', secondary: '#568892', muted: '#5f6c72'};
const mark: Palette = {background: '#f1eee6', ink: '#20322f', accent: '#b5523f', secondary: '#557b70', muted: '#626a67'};
const matthew: Palette = {background: '#f3eee4', ink: '#3b2a20', accent: '#a76925', secondary: '#6f825e', muted: '#71675f'};
const luke: Palette = {background: '#f3eef1', ink: '#302541', accent: '#a64f68', secondary: '#b27a2d', muted: '#6e6574'};

const Shell = ({children, label, reference, palette}: {children: ReactNode; label: string; reference: string; palette: Palette}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: palette.background}}>
      <Solid name="Paper background" width={1280} height={720} color={palette.background} />
      <Interactive.Div
        name="Upper atmosphere"
        style={{
          position: 'absolute',
          top: -330,
          right: -170,
          width: 760,
          height: 760,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.secondary}2c, ${palette.secondary}00 68%)`,
          scale: interpolate(frame, [0, 420], [0.92, 1.08], {easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      />
      <Interactive.Div
        name="Lower atmosphere"
        style={{
          position: 'absolute',
          bottom: -410,
          left: -230,
          width: 820,
          height: 820,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.accent}24, ${palette.accent}00 68%)`,
          opacity: interpolate(frame, [0, 70], [0.2, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      />
      <Interactive.Header
        name="Motion header"
        style={{position: 'absolute', zIndex: 20, top: 38, right: 68, left: 68, display: 'flex', justifyContent: 'space-between', color: palette.ink, fontFamily: 'Arial, sans-serif', fontSize: 22, fontWeight: 850, letterSpacing: 3.2, textTransform: 'uppercase'}}
      >
        <span>{label}</span><span style={{color: palette.accent}}>{reference}</span>
      </Interactive.Header>
      {children}
    </AbsoluteFill>
  );
};

const Opening = ({eyebrow, title, subtitle, palette}: {eyebrow: string; title: string; subtitle: string; palette: Palette}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: '118px 92px 82px', justifyContent: 'center', alignItems: 'center'}}>
      <Interactive.Div
        name="Opening statement"
        style={{
          display: 'grid',
          gap: 16,
          maxWidth: 1040,
          justifyItems: 'center',
          textAlign: 'center',
          opacity: interpolate(frame, [0, 18, 62, 82], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [0, 22], ['0px 28px', '0px 0px'], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <Interactive.Span name="Opening eyebrow" style={{color: palette.accent, fontFamily: 'Arial, sans-serif', fontSize: 28, fontWeight: 850, letterSpacing: 6, textTransform: 'uppercase'}}>{eyebrow}</Interactive.Span>
        <Interactive.H1 name="Opening title" style={{margin: 0, color: palette.ink, fontFamily: 'Georgia, serif', fontSize: 92, fontWeight: 400, lineHeight: 0.98, letterSpacing: -4}}>{title}</Interactive.H1>
        <Interactive.P name="Opening support" style={{maxWidth: 900, margin: '4px 0 0', color: palette.muted, fontFamily: 'Arial, sans-serif', fontSize: 34, lineHeight: 1.35}}>{subtitle}</Interactive.P>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const Final = ({kicker, title, prompt, palette}: {kicker: string; title: string; prompt: string; palette: Palette}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: '110px 100px 80px', justifyContent: 'center', alignItems: 'center'}}>
      <Interactive.Div name="Conclusion ring" style={{position: 'absolute', width: 500, height: 500, border: `2px solid ${palette.secondary}55`, borderRadius: '50%', opacity: interpolate(frame, [0, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(frame, [0, 46], [0.75, 1], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />
      <Interactive.Div name="Conclusion copy" style={{position: 'relative', zIndex: 2, display: 'grid', gap: 12, maxWidth: 980, justifyItems: 'center', textAlign: 'center', opacity: interpolate(frame, [8, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [8, 34], ['0px 24px', '0px 0px'], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <Interactive.Span name="Conclusion kicker" style={{color: palette.accent, fontFamily: 'Arial, sans-serif', fontSize: 27, fontWeight: 850, letterSpacing: 5.5, textTransform: 'uppercase'}}>{kicker}</Interactive.Span>
        <Interactive.H2 name="Conclusion title" style={{margin: 0, color: palette.ink, fontFamily: 'Georgia, serif', fontSize: 88, fontWeight: 400, lineHeight: 1, letterSpacing: -4}}>{title}</Interactive.H2>
        <Interactive.P name="Conclusion prompt" style={{maxWidth: 900, margin: '12px 0 0', color: palette.muted, fontFamily: 'Arial, sans-serif', fontSize: 30, lineHeight: 1.35, opacity: interpolate(frame, [34, 58], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{prompt}</Interactive.P>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const StepCard = ({name, title, detail, color, compact = false}: {name: string; title: string; detail: string; color: string; compact?: boolean}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div name={name} style={{display: 'grid', alignContent: 'start', minHeight: compact ? 166 : 205, padding: compact ? '22px 20px' : '28px 24px', border: `2px solid ${color}66`, borderRadius: 20, backgroundColor: '#ffffffbb', boxShadow: '0 18px 36px rgba(30, 31, 42, .08)', opacity: interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [0, 20], ['0px 34px', '0px 0px'], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(frame, [0, 20], [0.94, 1], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <strong style={{color, fontFamily: 'Arial, sans-serif', fontSize: compact ? 29 : 34, lineHeight: 1.05}}>{title}</strong>
      <span style={{marginTop: 13, color: '#666571', fontFamily: 'Arial, sans-serif', fontSize: compact ? 22 : 25, lineHeight: 1.35}}>{detail}</span>
    </Interactive.Div>
  );
};

const FourSenses = () => (
  <Shell label="HRE4M · Interpretation Field Kit" reference="One text · Four questions" palette={shared}>
    <Sequence name="Opening" from={0} durationInFrames={86}><Opening eyebrow="Read in connected layers" title="One text can open four faithful questions." subtitle="The spiritual senses grow from the literal sense; they never replace it." palette={shared} /></Sequence>
    <Sequence name="Four senses map" from={72} durationInFrames={205}>
      <AbsoluteFill style={{padding: '122px 72px 72px', justifyContent: 'center'}}>
        <Interactive.Div name="Literal foundation" style={{alignSelf: 'center', marginBottom: 28, padding: '18px 34px', borderRadius: 999, backgroundColor: shared.ink, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 31, fontWeight: 850, textAlign: 'center'}}>Literal foundation · What does the text communicate?</Interactive.Div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16}}>
          <Sequence name="Literal card" from={0} layout="none"><StepCard name="Literal sense" title="Literal" detail="Context · people · action · structure" color="#a16d23" /></Sequence>
          <Sequence name="Allegorical card" from={14} layout="none"><StepCard name="Allegorical sense" title="Allegorical" detail="Christ · salvation · Church" color="#587d92" /></Sequence>
          <Sequence name="Moral card" from={28} layout="none"><StepCard name="Moral sense" title="Moral" detail="Virtue · action · discipleship" color="#a9574a" /></Sequence>
          <Sequence name="Anagogical card" from={42} layout="none"><StepCard name="Anagogical sense" title="Anagogical" detail="Hope · resurrection · fulfilled Kingdom" color="#725d91" /></Sequence>
        </div>
        <Interactive.Div name="Connection line" style={{height: 4, margin: '26px 12% 0', borderRadius: 999, background: `linear-gradient(90deg, #a16d23, #587d92, #a9574a, #725d91)`, opacity: interpolate(useCurrentFrame(), [40, 76], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(useCurrentFrame(), [40, 76], [0.2, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />
      </AbsoluteFill>
    </Sequence>
    <Sequence name="Conclusion" from={262} durationInFrames={128}><Final kicker="The rule" title="Deeper does not mean detached." prompt="Begin with evidence. Then ask how the same text reveals Christ, forms life, and points toward fulfillment." palette={shared} /></Sequence>
  </Shell>
);

const ExegesisEisegesis = () => {
  const frame = useCurrentFrame();
  return (
    <Shell label="HRE4M · Evidence Check" reference="Method before meaning" palette={shared}>
      <Sequence name="Opening" from={0} durationInFrames={82}><Opening eyebrow="Two directions of reading" title="Are you drawing out—or reading in?" subtitle="The difference is whether the claim can be tested against the passage." palette={shared} /></Sequence>
      <Sequence name="Evidence comparison" from={70} durationInFrames={190}>
        <AbsoluteFill style={{padding: '124px 78px 72px', justifyContent: 'center'}}>
          <Interactive.Div name="Passage evidence" style={{alignSelf: 'center', width: 620, padding: '22px 30px', border: `2px solid ${shared.ink}55`, borderRadius: 18, backgroundColor: '#fff', color: shared.ink, fontFamily: 'Georgia, serif', fontSize: 34, lineHeight: 1.35, textAlign: 'center', boxShadow: '0 18px 40px rgba(30,35,77,.10)'}}>Context · repeated words · structure · genre · historical setting</Interactive.Div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32}}>
            <Sequence name="Exegesis path" from={10} layout="none"><StepCard name="Exegesis explanation" title="Exegesis ← evidence" detail="A claim grows from details the passage actually gives." color="#3f7f6f" /></Sequence>
            <Sequence name="Eisegesis path" from={32} layout="none"><StepCard name="Eisegesis explanation" title="Assumption → eisegesis" detail="A preferred idea is pushed into the passage without support." color="#a64f68" /></Sequence>
          </div>
          <Interactive.Div name="Evidence pulse" style={{alignSelf: 'center', width: interpolate(frame, [80, 145], [80, 520], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), height: 5, marginTop: 28, borderRadius: 999, backgroundColor: shared.accent, opacity: interpolate(frame, [70, 95], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />
        </AbsoluteFill>
      </Sequence>
      <Sequence name="Conclusion" from={244} durationInFrames={116}><Final kicker="Before you decide" title="What in the passage supports this?" prompt="A strong interpretation can point to its evidence and explain the connection." palette={shared} /></Sequence>
    </Shell>
  );
};

const RecognitionStep = ({title, detail, color}: {title: string; detail: string; color: string}) => {
  const frame = useCurrentFrame();
  return <Interactive.Div name={`Recognition: ${title}`} style={{display: 'grid', gap: 8, justifyItems: 'center', textAlign: 'center', opacity: interpolate(frame, [0, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [0, 18], ['0px 25px', '0px 0px'], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><span style={{display: 'grid', placeItems: 'center', width: 82, height: 82, border: `3px solid ${color}`, borderRadius: '50%', backgroundColor: '#fff', color, fontFamily: 'Georgia, serif', fontSize: 30}}>✦</span><strong style={{color, fontFamily: 'Arial, sans-serif', fontSize: 31}}>{title}</strong><small style={{color: john.muted, fontFamily: 'Arial, sans-serif', fontSize: 21, lineHeight: 1.3}}>{detail}</small></Interactive.Div>;
};

const SamaritanRecognition = () => (
  <Shell label="HRE4M · John Investigation" reference="John 4:1–42" palette={john}>
    <Sequence name="Opening" from={0} durationInFrames={82}><Opening eyebrow="Listen to the titles change" title="Recognition grows through encounter." subtitle="The conversation moves from ordinary water to worship, witness, and mission." palette={john} /></Sequence>
    <Sequence name="Recognition pathway" from={72} durationInFrames={192}>
      <AbsoluteFill style={{padding: '150px 66px 82px', justifyContent: 'center'}}>
        <Interactive.Div name="Living water line" style={{position: 'absolute', top: 296, right: 130, left: 130, height: 5, borderRadius: 999, background: `linear-gradient(90deg, ${john.secondary}44, ${john.secondary})`}} />
        <div style={{position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14}}>
          <Sequence name="A Jew" from={0} layout="none"><RecognitionStep title="A Jew" detail="A surprising conversation begins." color="#6d7d84" /></Sequence>
          <Sequence name="Sir" from={22} layout="none"><RecognitionStep title="Sir" detail="Questions make room for attention." color="#64828b" /></Sequence>
          <Sequence name="Prophet" from={44} layout="none"><RecognitionStep title="Prophet" detail="The conversation turns to worship." color="#567b86" /></Sequence>
          <Sequence name="Messiah" from={66} layout="none"><RecognitionStep title="Messiah?" detail="She brings the question to her town." color="#9c6c2f" /></Sequence>
          <Sequence name="Saviour" from={88} layout="none"><RecognitionStep title="Saviour" detail="The community encounters Jesus itself." color="#a24e64" /></Sequence>
        </div>
        <Interactive.P name="Witness movement" style={{margin: '48px 0 0', color: john.ink, fontFamily: 'Georgia, serif', fontSize: 38, textAlign: 'center', opacity: interpolate(useCurrentFrame(), [88, 122], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Encounter → question → recognition → witness</Interactive.P>
      </AbsoluteFill>
    </Sequence>
    <Sequence name="Conclusion" from={248} durationInFrames={112}><Final kicker="Return to the dialogue" title="What changes—and what causes it?" prompt="Track the woman’s words, Jesus’ responses, and the movement from private conversation to public witness." palette={john} /></Sequence>
  </Shell>
);

const TwoDaughters = () => {
  const frame = useCurrentFrame();
  return (
    <Shell label="HRE4M · Mark Investigation" reference="Mark 5:21–43" palette={mark}>
      <Sequence name="Opening" from={0} durationInFrames={82}><Opening eyebrow="Mark interrupts one story with another" title="Two daughters. One movement of restoration." subtitle="The delay is not a detour; the two stories interpret each other." palette={mark} /></Sequence>
      <Sequence name="Interwoven timeline" from={72} durationInFrames={206}>
        <AbsoluteFill style={{padding: '142px 86px 78px', justifyContent: 'center'}}>
          <Interactive.Div name="Jairus lane" style={{display: 'grid', gridTemplateColumns: '260px 1fr 270px', alignItems: 'center', gap: 18, padding: 24, borderRadius: 20, backgroundColor: '#ffffffb8'}}><strong style={{color: mark.ink, fontFamily: 'Arial, sans-serif', fontSize: 31}}>Jairus asks for help</strong><span style={{height: 6, borderRadius: 999, background: `linear-gradient(90deg, ${mark.accent}, ${mark.accent}55)`, scale: interpolate(frame, [0, 58], [0.05, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transformOrigin: '0% 50%'}} /><strong style={{color: mark.accent, fontFamily: 'Arial, sans-serif', fontSize: 31, opacity: interpolate(frame, [112, 146], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>“Little girl, arise.”</strong></Interactive.Div>
          <Interactive.Div name="Woman lane" style={{display: 'grid', gridTemplateColumns: '260px 1fr 270px', alignItems: 'center', gap: 18, marginTop: 28, padding: 24, border: `2px solid ${mark.secondary}66`, borderRadius: 20, backgroundColor: '#ffffffd4', opacity: interpolate(frame, [34, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [34, 64], ['0px 30px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><strong style={{color: mark.secondary, fontFamily: 'Arial, sans-serif', fontSize: 31}}>Twelve years suffering</strong><span style={{height: 6, borderRadius: 999, background: `linear-gradient(90deg, ${mark.secondary}55, ${mark.secondary})`}} /><strong style={{color: mark.secondary, fontFamily: 'Arial, sans-serif', fontSize: 31}}>“Daughter, your faith…”</strong></Interactive.Div>
          <Interactive.P name="Twelve-year connection" style={{margin: '42px 0 0', color: mark.ink, fontFamily: 'Georgia, serif', fontSize: 42, textAlign: 'center', opacity: interpolate(frame, [86, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>12-year-old girl · 12 years of suffering</Interactive.P>
        </AbsoluteFill>
      </Sequence>
      <Sequence name="Conclusion" from={260} durationInFrames={130}><Final kicker="Read the stories together" title="Delay makes room for another daughter." prompt="Notice touch, fear, dignity, restoration, and how Jesus responds to both forms of desperation." palette={mark} /></Sequence>
    </Shell>
  );
};

const SoilCard = ({title, detail, outcome, color}: {title: string; detail: string; outcome: string; color: string}) => {
  const frame = useCurrentFrame();
  return <Interactive.Div name={`${title} soil`} style={{display: 'grid', minHeight: 238, padding: '24px 20px', border: `2px solid ${color}66`, borderRadius: 20, backgroundColor: '#ffffffc7', opacity: interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [0, 20], ['0px 30px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><span style={{color, fontSize: 42}}>●</span><strong style={{marginTop: 14, color, fontFamily: 'Arial, sans-serif', fontSize: 32}}>{title}</strong><span style={{marginTop: 8, color: matthew.muted, fontFamily: 'Arial, sans-serif', fontSize: 22, lineHeight: 1.3}}>{detail}</span><em style={{alignSelf: 'end', marginTop: 18, color: matthew.ink, fontFamily: 'Georgia, serif', fontSize: 27, fontStyle: 'normal'}}>{outcome}</em></Interactive.Div>;
};

const FourSoils = () => (
  <Shell label="HRE4M · Matthew Investigation" reference="Matthew 13:1–23" palette={matthew}>
    <Sequence name="Opening" from={0} durationInFrames={82}><Opening eyebrow="The sower is consistently generous" title="The same seed meets four conditions." subtitle="The parable asks how hearing is received, sustained, crowded, or made fruitful." palette={matthew} /></Sequence>
    <Sequence name="Four outcomes" from={72} durationInFrames={198}>
      <AbsoluteFill style={{padding: '148px 70px 76px', justifyContent: 'center'}}>
        <Interactive.Div name="Generous sowing" style={{alignSelf: 'center', marginBottom: 28, color: matthew.accent, fontFamily: 'Arial, sans-serif', fontSize: 29, fontWeight: 850, letterSpacing: 4, textTransform: 'uppercase'}}>One generous sower · one kind of seed</Interactive.Div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16}}>
          <Sequence name="Path" from={0} layout="none"><SoilCard title="Path" detail="The word is heard but not understood." outcome="Taken away" color="#8c725d" /></Sequence>
          <Sequence name="Rocky" from={18} layout="none"><SoilCard title="Rocky" detail="It springs up without deep roots." outcome="Withers under pressure" color="#a86a43" /></Sequence>
          <Sequence name="Thorns" from={36} layout="none"><SoilCard title="Thorns" detail="Competing cares crowd its growth." outcome="Choked" color="#667c5d" /></Sequence>
          <Sequence name="Good soil" from={54} layout="none"><SoilCard title="Good soil" detail="It is heard, understood, and lived." outcome="Bears fruit" color="#4f8063" /></Sequence>
        </div>
      </AbsoluteFill>
    </Sequence>
    <Sequence name="Conclusion" from={250} durationInFrames={110}><Final kicker="The invitation" title="Examine the conditions for hearing." prompt="Do not permanently label other people as bad soil. Ask what supports or obstructs faithful response." palette={matthew} /></Sequence>
  </Shell>
);

const LostSons = () => {
  const frame = useCurrentFrame();
  return (
    <Shell label="HRE4M · Luke Investigation" reference="Luke 15:11–32" palette={luke}>
      <Sequence name="Opening" from={0} durationInFrames={82}><Opening eyebrow="The story has two lost sons" title="The father goes out twice." subtitle="One son is distant in a far country; the other is distant at the threshold." palette={luke} /></Sequence>
      <Sequence name="Two paths" from={72} durationInFrames={204}>
        <AbsoluteFill style={{padding: '136px 78px 72px', justifyContent: 'center'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 210px 1fr', gap: 24, alignItems: 'stretch'}}>
            <Sequence name="Younger son" from={0} layout="none"><StepCard name="Younger son path" title="Younger son" detail="Far country → hunger → return → embrace" color={luke.accent} /></Sequence>
            <Interactive.Div name="Merciful father" style={{display: 'grid', placeItems: 'center', alignContent: 'center', borderRadius: 105, backgroundColor: luke.ink, color: '#fff', textAlign: 'center', opacity: interpolate(frame, [18, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(frame, [18, 46], [0.8, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><span style={{fontSize: 48}}>↔</span><strong style={{fontFamily: 'Georgia, serif', fontSize: 31}}>Father<br />goes out</strong></Interactive.Div>
            <Sequence name="Older son" from={26} layout="none"><StepCard name="Older son path" title="Older son" detail="Field → resentment → refusal → invitation" color={luke.secondary} /></Sequence>
          </div>
          <Interactive.P name="Open ending" style={{margin: '42px 0 0', color: luke.ink, fontFamily: 'Georgia, serif', fontSize: 43, textAlign: 'center', opacity: interpolate(frame, [78, 112], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>The celebration begins. Will the older son enter?</Interactive.P>
        </AbsoluteFill>
      </Sequence>
      <Sequence name="Conclusion" from={258} durationInFrames={132}><Final kicker="Two forms of lostness" title="Mercy seeks both without denying truth." prompt="Read the open ending as an invitation to examine resentment, welcome, conversion, and joy." palette={luke} /></Sequence>
    </Shell>
  );
};

const Emmaus = () => {
  const frame = useCurrentFrame();
  const steps = [
    ['Road', 'Disappointment is voiced.'],
    ['Scripture', 'The story is reinterpreted.'],
    ['Table', 'Hospitality makes room.'],
    ['Recognition', 'Bread is broken.'],
    ['Return', 'Hope becomes mission.'],
  ];
  return (
    <Shell label="HRE4M · Luke Investigation" reference="Luke 24:13–35" palette={luke}>
      <Sequence name="Opening" from={0} durationInFrames={82}><Opening eyebrow="Recognition develops in stages" title="The road does not end at the table." subtitle="Scripture, hospitality, broken bread, and return transform disappointment into witness." palette={luke} /></Sequence>
      <Sequence name="Emmaus pathway" from={72} durationInFrames={224}>
        <AbsoluteFill style={{padding: '142px 58px 76px', justifyContent: 'center'}}>
          <Interactive.Div name="Road line" style={{position: 'absolute', top: 288, right: 120, left: 120, height: 6, borderRadius: 999, background: `linear-gradient(90deg, ${luke.accent}55, ${luke.secondary})`, scale: interpolate(frame, [0, 100], [0.05, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transformOrigin: '0% 50%'}} />
          <div style={{position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12}}>
            {steps.map(([title, detail], index) => <Sequence key={title} name={title} from={index * 20} layout="none"><StepCard name={`Emmaus ${title}`} title={title} detail={detail} color={index < 3 ? luke.accent : luke.secondary} compact /></Sequence>)}
          </div>
          <Interactive.Div name="Mass resonance" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, margin: '34px 50px 0', padding: '18px 24px', border: `2px solid ${luke.ink}33`, borderRadius: 18, backgroundColor: '#ffffffa8', color: luke.ink, fontFamily: 'Arial, sans-serif', fontSize: 25, fontWeight: 800, textAlign: 'center', opacity: interpolate(frame, [96, 134], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [96, 136], ['0px 22px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><span>Gather</span><span>Word</span><span>Eucharist</span><span>Mission</span></Interactive.Div>
        </AbsoluteFill>
      </Sequence>
      <Sequence name="Conclusion" from={286} durationInFrames={134}><Final kicker="Recognition becomes movement" title="They return to the community." prompt="Test the Catholic resonance against Luke’s sequence: conversation, Scripture, invitation, bread, recognition, and mission." palette={luke} /></Sequence>
    </Shell>
  );
};

export const LearningMotionCompositions = () => (
  <>
    <Composition id="FourSenses" component={FourSenses} durationInFrames={390} fps={30} width={1280} height={720} />
    <Composition id="ExegesisEisegesis" component={ExegesisEisegesis} durationInFrames={360} fps={30} width={1280} height={720} />
    <Composition id="SamaritanRecognition" component={SamaritanRecognition} durationInFrames={360} fps={30} width={1280} height={720} />
    <Composition id="TwoDaughters" component={TwoDaughters} durationInFrames={390} fps={30} width={1280} height={720} />
    <Composition id="FourSoils" component={FourSoils} durationInFrames={360} fps={30} width={1280} height={720} />
    <Composition id="LostSons" component={LostSons} durationInFrames={390} fps={30} width={1280} height={720} />
    <Composition id="Emmaus" component={Emmaus} durationInFrames={420} fps={30} width={1280} height={720} />
  </>
);
