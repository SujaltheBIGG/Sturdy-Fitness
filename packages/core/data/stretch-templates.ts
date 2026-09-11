import type { DayType, Exercise } from '../types'

/** Section type for warmup/cooldown exercises */
type Section = 'warmup' | 'cooldown'

function ex(id: string, name: string, sets: number, reps: string, rest: number, muscles: string, note: string, youtube: string, section: Section, opts?: { isTimer?: boolean; timerSeconds?: number }): Exercise {
  return { id, name, sets, reps, rest, muscles, note, youtube, priority: 'med', ...opts, section } as Exercise & { section: Section }
}

// ── Warmup exercises (dynamic) ───────────────────────────────────────────────

const shoulder_dislocates = (s: Section) => ex('shoulder_dislocates', 'Shoulder Dislocates', 2, '12', 30, 'Shoulders, mobility', 'With a towel or band. Pass it overhead and behind you.', 'shoulder dislocate band tutorial', s)
const scapular_activation = (s: Section) => ex('scapular_activation', 'Scapular Activation', 2, '12', 15, 'Scapulae, upper back', 'Scapular protraction and retraction in a push-up position or hanging.', 'scapular activation push up hang', s)
const thoracic_rotation = (s: Section) => ex('thoracic_rotation', 'Thoracic Rotation', 2, '10/lado', 15, 'Thoracic spine, obliques', 'On all fours, hand behind your head, rotate opening the elbow to the ceiling.', 'thoracic rotation mobility drill', s)
const arm_circles = (s: Section) => ex('arm_circles', 'Arm Circles', 2, '15 each direction', 15, 'Shoulders, rotator cuff', 'Basic warm-up. Small circles to large.', 'arm circles warm up shoulder', s)
const hip_circles = (s: Section) => ex('hip_circles', 'Hip Circles', 2, '10 each direction', 15, 'Hip, glutes', 'Standing, wide circles with the knee. Lubricates the hip joint.', 'hip circles warm up mobility', s)
const leg_swings = (s: Section) => ex('leg_swings', 'Leg Swings', 2, '15/lado', 15, 'Hip, hamstrings, adductors', 'Front and side. Progressive range.', 'leg swings warm up dynamic stretching', s)
const ankle_mobility = (s: Section) => ex('ankle_mobility', 'Ankle Mobility Drill', 2, '15/lado', 15, 'Ankle, soleus', 'Necessary for the pistol squat and deep squats.', 'ankle mobility drill squat depth', s)
const glute_bridge_warmup = (s: Section) => ex('glute_bridge_warmup', 'Glute Bridge Warm-up', 2, '12', 15, 'Glutes, core', 'Lying face up, lift your hips squeezing the glutes. Activation before leg work.', 'glute bridge warm up activation', s)
const cat_cow = (s: Section) => ex('cat_cow', 'Cat-Cow', 2, '10', 15, 'Spine, core', 'On all fours, alternate between arching and rounding your back. Spinal mobility.', 'cat cow stretch spine mobility', s)

// ── Cooldown exercises (static) ──────────────────────────────────────────────

const pectoral_stretch = (s: Section) => ex('pectoral_stretch', 'Pectoral Stretch', 2, '30s', 30, 'Chest', 'Chest stretch in a doorway or against a wall. Hold 30s per side.', 'pectoral stretch doorway chest', s, { isTimer: true, timerSeconds: 30 })
const triceps_stretch = (s: Section) => ex('triceps_stretch', 'Triceps Stretch', 2, '30s', 30, 'Triceps', 'Arm behind your head, push the elbow with your other hand. 30s per side.', 'triceps stretch overhead', s, { isTimer: true, timerSeconds: 30 })
const lat_stretch = (s: Section) => ex('lat_stretch', 'Lat Stretch', 2, '30s', 30, 'Lats, back', 'Hold a post or frame and lean away. Feel the stretch down your side.', 'lat stretch doorway back', s, { isTimer: true, timerSeconds: 30 })
const biceps_stretch = (s: Section) => ex('biceps_stretch', 'Biceps Stretch', 2, '30s', 30, 'Biceps', 'Arm extended against a wall, rotate your torso away. 30s per side.', 'biceps stretch wall', s, { isTimer: true, timerSeconds: 30 })
const quad_stretch = (s: Section) => ex('quad_stretch', 'Quad Stretch', 2, '30s', 30, 'Quads', 'Standing, bring your heel to your glute. Keep your balance. 30s per side.', 'quad stretch standing', s, { isTimer: true, timerSeconds: 30 })
const hamstring_stretch = (s: Section) => ex('hamstring_stretch', 'Hamstring Stretch', 2, '30s', 30, 'Hamstrings', 'Leg raised on a surface, hinge forward. 30s per side.', 'hamstring stretch standing', s, { isTimer: true, timerSeconds: 30 })
const hip_flexor_stretch = (s: Section) => ex('hip_flexor_stretch', 'Hip Flexor Stretch', 2, '30s', 30, 'Hip flexors, psoas', 'Lunge position, rear knee on the floor. Push your hip forward.', 'hip flexor stretch kneeling psoas', s, { isTimer: true, timerSeconds: 30 })
const calf_stretch = (s: Section) => ex('calf_stretch', 'Calf Stretch', 2, '30s', 30, 'Calves', 'Against a wall, rear leg straight, heel on the floor. 30s per side.', 'calf stretch wall standing', s, { isTimer: true, timerSeconds: 30 })
const pike_stretch = (s: Section) => ex('pike_stretch', 'Pike Stretch', 3, '60s', 30, 'Hamstrings, calves', 'Seated, legs together and straight. Reach for your feet.', 'pike stretch hamstring flexibility tutorial', s, { isTimer: true, timerSeconds: 60 })
const deep_breathing = (s: Section) => ex('deep_breathing', 'Deep Breathing', 1, '2 min', 0, 'Diaphragm, recovery', 'Deep diaphragmatic breathing. Inhale 4s, hold 4s, exhale 6s. Cool-down.', 'deep breathing exercise recovery cooldown', s, { isTimer: true, timerSeconds: 120 })

/**
 * Static map of warmup/cooldown exercise templates per DayType.
 * Each exercise is a full Exercise object ready to be inserted into a workout.
 */
export const stretchTemplates: Record<DayType, { warmup: Exercise[]; cooldown: Exercise[] }> = {
  push: {
    warmup: [shoulder_dislocates('warmup'), scapular_activation('warmup'), thoracic_rotation('warmup')],
    cooldown: [pectoral_stretch('cooldown'), triceps_stretch('cooldown'), deep_breathing('cooldown')],
  },
  pull: {
    warmup: [thoracic_rotation('warmup'), scapular_activation('warmup'), arm_circles('warmup')],
    cooldown: [lat_stretch('cooldown'), biceps_stretch('cooldown'), deep_breathing('cooldown')],
  },
  legs: {
    warmup: [hip_circles('warmup'), leg_swings('warmup'), ankle_mobility('warmup'), glute_bridge_warmup('warmup')],
    cooldown: [quad_stretch('cooldown'), hamstring_stretch('cooldown'), hip_flexor_stretch('cooldown'), calf_stretch('cooldown')],
  },
  lumbar: {
    warmup: [cat_cow('warmup'), hip_circles('warmup'), thoracic_rotation('warmup')],
    cooldown: [pike_stretch('cooldown'), hip_flexor_stretch('cooldown'), deep_breathing('cooldown')],
  },
  full: {
    warmup: [arm_circles('warmup'), hip_circles('warmup'), cat_cow('warmup'), thoracic_rotation('warmup')],
    cooldown: [pectoral_stretch('cooldown'), lat_stretch('cooldown'), hamstring_stretch('cooldown'), deep_breathing('cooldown')],
  },
  cardio: {
    warmup: [ankle_mobility('warmup'), hip_circles('warmup'), leg_swings('warmup')],
    cooldown: [hamstring_stretch('cooldown'), calf_stretch('cooldown'), hip_flexor_stretch('cooldown'), deep_breathing('cooldown')],
  },
  rest: {
    warmup: [],
    cooldown: [],
  },
  yoga: {
    warmup: [],
    cooldown: [],
  },
  circuit: {
    warmup: [ankle_mobility('warmup'), hip_circles('warmup'), leg_swings('warmup'), arm_circles('warmup')],
    cooldown: [hamstring_stretch('cooldown'), calf_stretch('cooldown'), hip_flexor_stretch('cooldown'), deep_breathing('cooldown')],
  },
}
