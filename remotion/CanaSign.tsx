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

export type CanaSignProps = {
  title: string;
  reference: string;
  closingLine: string;
};

const Jar = ({name, number}: {name: string; number: string}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: 'relative',
        width: 112,
        height: 224,
        overflow: 'hidden',
        border: '4px solid #18234d',
        borderRadius: '24px 24px 34px 34px',
        backgroundColor: '#f6f0e3',
        boxShadow: '0 24px 48px rgba(24, 35, 77, 0.13)',
        opacity: interpolate(frame, [0, 18, 85, 110], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        translate: interpolate(frame, [0, 22, 85, 110], ['0px 44px', '0px 0px', '0px 0px', '0px -22px'], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        scale: interpolate(frame, [0, 22], [0.9, 1], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
    >
      <Interactive.Div
        name={`${name} water`}
        style={{
          position: 'absolute',
          right: 5,
          bottom: 5,
          left: 5,
          height: interpolate(frame, [18, 62], ['10%', '72%'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          borderRadius: '10px 10px 25px 25px',
          backgroundColor: '#9ec8d1',
          opacity: interpolate(frame, [38, 68], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <Interactive.Div
        name={`${name} wine`}
        style={{
          position: 'absolute',
          right: 5,
          bottom: 5,
          left: 5,
          height: interpolate(frame, [18, 62], ['10%', '72%'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          borderRadius: '10px 10px 25px 25px',
          background: 'linear-gradient(180deg, #b96d57 0%, #7f3344 100%)',
          opacity: interpolate(frame, [38, 68], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <Interactive.Span
        name={`${name} number`}
        style={{
          position: 'absolute',
          top: 82,
          left: 0,
          width: '100%',
          color: '#18234d',
          fontFamily: 'Georgia, serif',
          fontSize: 34,
          textAlign: 'center',
          opacity: interpolate(frame, [12, 28], [0, 0.72], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {number}
      </Interactive.Span>
    </Interactive.Div>
  );
};

const CopyBlock = ({children, name}: {children: ReactNode; name: string}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        display: 'grid',
        gap: 14,
        alignContent: 'center',
        justifyItems: 'center',
        maxWidth: 1000,
        textAlign: 'center',
        opacity: interpolate(frame, [0, 18, 62, 84], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        translate: interpolate(frame, [0, 22], ['0px 34px', '0px 0px'], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};

const FinalMessage = ({closingLine}: Pick<CanaSignProps, 'closingLine'>) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{padding: '92px 92px 86px', justifyContent: 'center', alignItems: 'center'}}>
      <Interactive.Div
        name="Glory halo"
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          border: '2px solid rgba(185, 109, 87, 0.34)',
          borderRadius: '50%',
          opacity: interpolate(frame, [0, 34], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 52], [0.72, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <Interactive.Div
        name="Final statement"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gap: 8,
          justifyItems: 'center',
          textAlign: 'center',
          opacity: interpolate(frame, [8, 34], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [8, 36], ['0px 26px', '0px 0px'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <Interactive.Span
          name="Visible sign line"
          style={{color: '#18234d', fontFamily: 'Arial, sans-serif', fontSize: 42, fontWeight: 800, letterSpacing: 7, textTransform: 'uppercase'}}
        >
          A visible sign
        </Interactive.Span>
        <Interactive.Span
          name="Reveals glory line"
          style={{color: '#9a6a24', fontFamily: 'Georgia, serif', fontSize: 118, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: -6}}
        >
          reveals glory.
        </Interactive.Span>
      </Interactive.Div>

      <Interactive.Div
        name="Interpretive pathway"
        style={{
          position: 'absolute',
          right: 92,
          bottom: 72,
          left: 92,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 22,
          color: '#18234d',
          fontFamily: 'Arial, sans-serif',
          fontSize: 30,
          fontWeight: 750,
          opacity: interpolate(frame, [42, 68], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [42, 70], ['0px 20px', '0px 0px'], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span>Need</span><span style={{color: '#b96d57'}}>→</span>
        <span>Trust</span><span style={{color: '#b96d57'}}>→</span>
        <span>Abundance</span><span style={{color: '#b96d57'}}>→</span>
        <span>Belief</span>
      </Interactive.Div>

      <Interactive.Span
        name="Closing prompt"
        style={{
          position: 'absolute',
          top: 112,
          color: '#6b6670',
          fontFamily: 'Arial, sans-serif',
          fontSize: 30,
          letterSpacing: 1,
          opacity: interpolate(frame, [45, 65], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {closingLine}
      </Interactive.Span>
    </AbsoluteFill>
  );
};

export const CanaSign = ({title, reference, closingLine}: CanaSignProps) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#f4efe4'}}>
      <Solid name="Warm paper background" width={1280} height={720} color="#f4efe4" />
      <Interactive.Div
        name="Navy atmosphere"
        style={{
          position: 'absolute',
          top: -280,
          right: -140,
          width: 720,
          height: 720,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(24, 35, 77, 0.16), rgba(24, 35, 77, 0))',
          opacity: interpolate(frame, [0, 50], [0.2, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 270], [0.92, 1.08], {
            easing: Easing.inOut(Easing.cubic),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <Interactive.Div
        name="Wine atmosphere"
        style={{
          position: 'absolute',
          bottom: -320,
          left: -180,
          width: 760,
          height: 760,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(185, 109, 87, 0.19), rgba(185, 109, 87, 0))',
          opacity: interpolate(frame, [55, 120], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />

      <Interactive.Header
        name="Composition header"
        style={{
          position: 'absolute',
          zIndex: 5,
          top: 42,
          right: 72,
          left: 72,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#18234d',
          fontFamily: 'Arial, sans-serif',
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}
      >
        <span>HRE4M · Gospel Investigation</span>
        <span style={{color: '#9a6a24'}}>{reference}</span>
      </Interactive.Header>

      <Sequence name="Opening idea" from={0} durationInFrames={88}>
        <AbsoluteFill style={{padding: '116px 100px 92px', justifyContent: 'center', alignItems: 'center'}}>
          <CopyBlock name="Opening copy">
            <Interactive.Span
              name="Opening eyebrow"
              style={{color: '#9a6a24', fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 850, letterSpacing: 6, textTransform: 'uppercase'}}
            >
              Notice the movement
            </Interactive.Span>
            <Interactive.H1
              name="Opening title"
              style={{margin: 0, color: '#18234d', fontFamily: 'Georgia, serif', fontSize: 94, fontWeight: 400, lineHeight: 0.98, letterSpacing: -4}}
            >
              {title}
            </Interactive.H1>
            <Interactive.P
              name="Opening support"
              style={{margin: '10px 0 0', color: '#6b6670', fontFamily: 'Arial, sans-serif', fontSize: 36, lineHeight: 1.35}}
            >
              Six stone jars begin with ordinary water.
            </Interactive.P>
          </CopyBlock>
        </AbsoluteFill>
      </Sequence>

      <AbsoluteFill style={{padding: '148px 74px 82px', justifyContent: 'flex-end', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: 18, alignItems: 'flex-end'}}>
          <Sequence name="Jar 1" from={76} durationInFrames={115} layout="none"><Jar name="Jar 1 vessel" number="1" /></Sequence>
          <Sequence name="Jar 2" from={81} durationInFrames={115} layout="none"><Jar name="Jar 2 vessel" number="2" /></Sequence>
          <Sequence name="Jar 3" from={86} durationInFrames={115} layout="none"><Jar name="Jar 3 vessel" number="3" /></Sequence>
          <Sequence name="Jar 4" from={91} durationInFrames={115} layout="none"><Jar name="Jar 4 vessel" number="4" /></Sequence>
          <Sequence name="Jar 5" from={96} durationInFrames={115} layout="none"><Jar name="Jar 5 vessel" number="5" /></Sequence>
          <Sequence name="Jar 6" from={101} durationInFrames={115} layout="none"><Jar name="Jar 6 vessel" number="6" /></Sequence>
        </div>
      </AbsoluteFill>

      <Sequence name="Transformation idea" from={76} durationInFrames={100}>
        <AbsoluteFill style={{padding: '122px 100px 390px', justifyContent: 'center', alignItems: 'center'}}>
          <CopyBlock name="Transformation copy">
            <Interactive.Span
              name="Transformation eyebrow"
              style={{color: '#9a6a24', fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 850, letterSpacing: 6, textTransform: 'uppercase'}}
            >
              Command becomes abundance
            </Interactive.Span>
            <Interactive.H2
              name="Transformation title"
              style={{margin: 0, color: '#18234d', fontFamily: 'Georgia, serif', fontSize: 82, fontWeight: 400, lineHeight: 0.98, letterSpacing: -4}}
            >
              Water becomes wine.
            </Interactive.H2>
          </CopyBlock>
        </AbsoluteFill>
      </Sequence>

      <Sequence name="Interpretive conclusion" from={165} durationInFrames={105}>
        <FinalMessage closingLine={closingLine} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const CanaSignComposition = () => (
  <Composition
    id="CanaSign"
    component={CanaSign}
    durationInFrames={270}
    fps={30}
    width={1280}
    height={720}
    defaultProps={{
      title: 'An ordinary need becomes a sign.',
      reference: 'John 2:1–11',
      closingLine: 'Return to the text: what does the sign reveal about Jesus?',
    }}
  />
);
