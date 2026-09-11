import type { Phase, WeekDay, Workout, WorkoutsMap, DayId } from '../types'

export const PHASES: Phase[] = [
  { id: 1, name: "Base & Activation", nameKey: "phase.1", weeks: "1-6", color: "#c8f542", bg: "rgba(200,245,66,0.08)" },
  { id: 2, name: "Foundational Strength", nameKey: "phase.2", weeks: "7-13", color: "#42c8f5", bg: "rgba(66,200,245,0.08)" },
  { id: 3, name: "Intensidad & Skills", nameKey: "phase.3", weeks: "14-20", color: "#f542c8", bg: "rgba(245,66,200,0.08)" },
  { id: 4, name: "Peak & Consolidation", nameKey: "phase.4", weeks: "21-26", color: "#f5c842", bg: "rgba(245,200,66,0.08)" },
]

export const WEEK_DAYS: WeekDay[] = [
  { id: "lun", name: "Monday",    nameKey: "day.lun", focus: "Push + Core",     focusKey: "dayFocus.lun", type: "push",   color: "#c8f542" },
  { id: "mar", name: "Tuesday",   nameKey: "day.mar", focus: "Pull + Mobility",  focusKey: "dayFocus.mar", type: "pull",   color: "#42c8f5" },
  { id: "mie", name: "Wednesday",nameKey: "day.mie", focus: "Lower back + Stretching",focusKey: "dayFocus.mie", type: "lumbar", color: "#f54242" },
  { id: "jue", name: "Thursday",   nameKey: "day.jue", focus: "Legs + Glutes",  focusKey: "dayFocus.jue", type: "legs",   color: "#f542c8" },
  { id: "vie", name: "Friday",  nameKey: "day.vie", focus: "Full Body + Core",   focusKey: "dayFocus.vie", type: "full",   color: "#f5c842" },
  { id: "sab", name: "Saturday",   nameKey: "day.sab", focus: "Active walk",    focusKey: "dayFocus.sab", type: "rest",   color: "#888899" },
  { id: "dom", name: "Sunday",  nameKey: "day.dom", focus: "Full rest",     focusKey: "dayFocus.dom", type: "rest",   color: "#888899" },
]

export const WORKOUTS: WorkoutsMap = {
  // ═══════════════════════════════════════ FASE 1 ══════════════════════════════
  p1_lun: {
    phase: 1, day: "lun", title: "Push + Lower Back Core",
    exercises: [
      { id: "bird_dog", name: "Bird-Dog", sets: 3, reps: "12/side", rest: 60, muscles: "Lower back, core, glutes", note: "Neutral back, hold 2s at the top. HIGH PRIORITY.", youtube: "Bird Dog exercise tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "hollow_hold", name: "Hollow Body Hold", sets: 3, reps: "20-30s", rest: 60, muscles: "Deep core, TVA", note: "Lower back PRESSED to the floor. Legs as far away as possible.", youtube: "Hollow body hold tutorial calisthenics", priority: "high", isTimer: true, timerSeconds: 25, equipment: ['ninguno'] },
      { id: "pushup_std", name: "Standard Push-up", sets: 4, reps: "8-12", rest: 90, muscles: "Chest, shoulders, triceps", note: "Body rigid as a plank, elbows at 45°, chest touches the floor.", youtube: "perfect push up form tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "pike_pushup", name: "Pike Push-up", sets: 3, reps: "8-10", rest: 90, muscles: "Delts, triceps", note: "Hips up in a V. Head between your arms as you lower.", youtube: "pike push up tutorial shoulder", priority: "med", equipment: ['ninguno'] },
      { id: "dips_chair", name: "Chair Dips", sets: 3, reps: "8-12", rest: 90, muscles: "Triceps, shoulders", note: "Back close to the bench, no more than 90° at the elbows.", youtube: "tricep dips chair tutorial", priority: "low", equipment: ['banco'] },
      { id: "plank", name: "Plank", sets: 3, reps: "30-45s", rest: 60, muscles: "Full core", note: "Don't let your hips drop. Glutes squeezed.", youtube: "perfect plank form tutorial", priority: "high", isTimer: true, timerSeconds: 40, equipment: ['ninguno'] },
    ]
  },
  p1_mar: {
    phase: 1, day: "mar", title: "Pull + Mobility",
    exercises: [
      { id: "scap_retract", name: "Scapular Retraction", sets: 3, reps: "10-12", rest: 60, muscles: "Rhomboids, traps", note: "Arms straight, lift using only your shoulder blades. Key for posture.", youtube: "scapular retraction dead hang tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "australian_pullup", name: "Australian Pull-up", sets: 4, reps: "8-12", rest: 90, muscles: "Lats, biceps, rhomboids", note: "Body rigid, pull your chest to the bar. Use a table/chair if you have no low bar.", youtube: "australian pull up inverted row tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "neg_pullup", name: "Negative Pull-ups", sets: 3, reps: "5 (5s lowering)", rest: 120, muscles: "Lats, biceps", note: "Step up with a chair, lower VERY slowly over 5 seconds. Foundation for pull-ups.", youtube: "negative pull up tutorial beginners", priority: "med", equipment: ['barra_dominadas'] },
      { id: "face_pull", name: "Face Pull (band/towel)", sets: 3, reps: "12-15", rest: 60, muscles: "Rear delts, rotator cuff", note: "Pull toward your face, spreading the elbows. Key anti-lordosis work.", youtube: "face pull band tutorial posture", priority: "med", equipment: ['banda_elastica', 'toalla'] },
      { id: "cat_cow", name: "Cat-Cow", sets: 2, reps: "12 slow", rest: 30, muscles: "Spine, lower back", note: "Slow and controlled. Feel each vertebra.", youtube: "cat cow yoga stretch spine", priority: "high", equipment: ['ninguno'] },
      { id: "superman", name: "Superman Hold", sets: 3, reps: "10 (3s at top)", rest: 60, muscles: "Erectors, glutes, lower back", note: "Strengthens the posterior chain. Essential for your lower back.", youtube: "superman exercise back extension tutorial", priority: "high", equipment: ['ninguno'] },
    ]
  },
  p1_mie: {
    phase: 1, day: "mie", title: "Lower Back + Active Stretching",
    exercises: [
      { id: "hip_flexor", name: "Hip Flexor Stretch (Psoas)", sets: 3, reps: "60s/side", rest: 30, muscles: "Psoas, iliacus", note: "A tight psoas IS the cause of your pain. 60s minimum per side.", youtube: "hip flexor stretch psoas tight tutorial", priority: "high", isTimer: true, timerSeconds: 60, equipment: ['ninguno'] },
      { id: "pigeon", name: "Pigeon Pose", sets: 2, reps: "90s/side", rest: 30, muscles: "Glute, piriformis", note: "A tight piriformis compresses the sciatic nerve → lower back pain.", youtube: "pigeon pose tutorial piriformis stretch", priority: "high", isTimer: true, timerSeconds: 90, equipment: ['ninguno'] },
      { id: "childs_pose", name: "Child's Pose with Traction", sets: 3, reps: "60s", rest: 30, muscles: "Lower back, lats, hips", note: "Arms extended in front. Let gravity decompress the spine.", youtube: "child pose yoga extended arms spine", priority: "high", isTimer: true, timerSeconds: 60, equipment: ['ninguno'] },
      { id: "glute_bridge", name: "Glute Bridge", sets: 4, reps: "15", rest: 60, muscles: "Glutes, hamstrings, lower back", note: "Weak glutes overload the lower back. Squeeze hard at the top, 1s pause.", youtube: "glute bridge tutorial form", priority: "high", equipment: ['ninguno'] },
      { id: "dead_bug", name: "Dead Bug", sets: 3, reps: "10/side", rest: 60, muscles: "Deep core, TVA", note: "Lower back PRESSED to the floor the whole time. Slow and controlled.", youtube: "dead bug exercise core tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "thoracic_rot", name: "Thoracic Rotation", sets: 3, reps: "10/side", rest: 30, muscles: "Thoracic spine, obliques", note: "Lying on your side, knees bent, rotate only the torso. Releases lower back pressure.", youtube: "thoracic rotation stretch tutorial spine", priority: "med", equipment: ['ninguno'] },
      { id: "forward_fold", name: "Seated Forward Fold", sets: 3, reps: "60s", rest: 30, muscles: "Hamstrings, lower back", note: "Short hamstrings = kyphotic posture = lower back pain.", youtube: "seated forward fold hamstring stretch tutorial", priority: "med", isTimer: true, timerSeconds: 60, equipment: ['ninguno'] },
    ]
  },
  p1_jue: {
    phase: 1, day: "jue", title: "Legs + Glutes",
    exercises: [
      { id: "glute_bridge_uni", name: "Glute Bridge Unilateral", sets: 3, reps: "12/side", rest: 60, muscles: "Glute, hamstrings", note: "Corrects left/right imbalances that cause lower back pain.", youtube: "single leg glute bridge tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "goblet_squat", name: "Sentadilla Goblet", sets: 4, reps: "12-15", rest: 90, muscles: "Quads, glutes, core", note: "Back straight, knees over your toes, 90°.", youtube: "goblet squat bodyweight tutorial form", priority: "high", equipment: ['ninguno'] },
      { id: "reverse_lunge", name: "Reverse Lunge", sets: 3, reps: "10/side", rest: 90, muscles: "Quads, glutes, hamstrings", note: "Step backward. Safer for the knees than a forward lunge.", youtube: "reverse lunge tutorial form", priority: "med", equipment: ['ninguno'] },
      { id: "good_morning", name: "Good Morning (bodyweight)", sets: 3, reps: "12", rest: 60, muscles: "Hamstrings, lower back, glutes", note: "Feet shoulder-width apart, hinge the torso with a straight back.", youtube: "good morning exercise bodyweight tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "calf_raise", name: "Calf Raises", sets: 3, reps: "20", rest: 45, muscles: "Calves, soleus", note: "Slow and through a full range.", youtube: "calf raise tutorial form", priority: "low", equipment: ['ninguno'] },
      { id: "wall_sit", name: "Wall Sit", sets: 3, reps: "45s", rest: 60, muscles: "Quads, core", note: "Back flat against the wall, knees at 90°.", youtube: "wall sit exercise tutorial", priority: "med", isTimer: true, timerSeconds: 45, equipment: ['pared'] },
    ]
  },
  p1_vie: {
    phase: 1, day: "vie", title: "Full Body + Full Core",
    exercises: [
      { id: "archer_pushup", name: "Archer Push-up (Regression)", sets: 3, reps: "6/side", rest: 90, muscles: "Unilateral chest", note: "Lead arm extended, load on the other. Progression toward one-arm.", youtube: "archer push up tutorial progression", priority: "high", equipment: ['ninguno'] },
      { id: "pullup_neg2", name: "Assisted Pull-up or Negatives", sets: 4, reps: "5-8", rest: 120, muscles: "Lats, biceps", note: "Use a resistance band if you can't do a full pull-up.", youtube: "assisted pull up band tutorial", priority: "high", equipment: ['barra_dominadas', 'banda_elastica'] },
      { id: "jump_squat", name: "Jump Squat", sets: 3, reps: "10", rest: 60, muscles: "Legs, power", note: "Land softly with bent knees. Only if there is no pain.", youtube: "jump squat tutorial plyometric", priority: "med", equipment: ['ninguno'] },
      { id: "lsit_prog", name: "L-sit Progression", sets: 3, reps: "15-20s", rest: 90, muscles: "Core, hip flexors", note: "Start with both heels on the floor, then lift one leg.", youtube: "L-sit progression tutorial beginners", priority: "high", isTimer: true, timerSeconds: 20, equipment: ['ninguno'] },
      { id: "side_plank", name: "Side Plank", sets: 3, reps: "30s/side", rest: 60, muscles: "Obliques, quadratus lumborum", note: "Body straight as a plank.", youtube: "side plank tutorial form", priority: "med", isTimer: true, timerSeconds: 30, equipment: ['ninguno'] },
      { id: "burpees", name: "Burpees", sets: 3, reps: "8-10", rest: 90, muscles: "Full body, cardio", note: "Controlled. Swap for mountain climbers if there is pain.", youtube: "burpee tutorial form proper", priority: "low", equipment: ['ninguno'] },
    ]
  },
  // ═══════════════════════════════════════ FASE 2 ══════════════════════════════
  p2_lun: {
    phase: 2, day: "lun", title: "Advanced Push",
    exercises: [
      { id: "hollow_rock", name: "Hollow Body Rock", sets: 3, reps: "15-20", rest: 60, muscles: "Deep core", note: "Progression from the static Hollow Hold. Controlled rocking.", youtube: "hollow body rock calisthenics tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "diamond_pushup", name: "Diamond Push-up", sets: 4, reps: "8-12", rest: 90, muscles: "Triceps, inner chest", note: "Hands in a diamond under your sternum. Elbows tucked as you lower.", youtube: "diamond push up triceps tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "wide_pushup", name: "Wide Push-up", sets: 3, reps: "10-15", rest: 90, muscles: "Outer chest, delts", note: "Hands wider than shoulder-width.", youtube: "wide push up chest tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "pike_elevated", name: "Pike Push-up Elevado", sets: 4, reps: "8-10", rest: 90, muscles: "Delts, triceps", note: "Feet on a chair. More load on the shoulders. Progression toward HSPU.", youtube: "elevated pike push up shoulder press tutorial", priority: "med", equipment: ['banco'] },
      { id: "dips_parallel", name: "Parallel Bar Dips (2 chairs)", sets: 4, reps: "8-12", rest: 90, muscles: "Triceps, lower chest", note: "Full range. Don't let your shoulders shrug up.", youtube: "parallel bar dips chairs tutorial", priority: "high", equipment: ['paralelas'] },
      { id: "plank_shoulder", name: "Plank Shoulder Taps", sets: 3, reps: "12/side", rest: 60, muscles: "Anti-rotation core", note: "Don't move your hips as you tap the opposite shoulder.", youtube: "plank shoulder tap anti rotation core tutorial", priority: "high", equipment: ['ninguno'] },
    ]
  },
  p2_mar: {
    phase: 2, day: "mar", title: "Advanced Pull",
    exercises: [
      { id: "pullup_strict", name: "Pull-up Estricto", sets: 5, reps: "max (target 8-12)", rest: 120, muscles: "Lats, biceps", note: "No kipping. 1s pause at the top.", youtube: "strict pull up form tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "chinup", name: "Chin-up (agarre supino)", sets: 4, reps: "max", rest: 120, muscles: "Biceps, lats", note: "Easier than a pull-up. Use it to accumulate volume.", youtube: "chin up supinated grip tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "renegade_row", name: "Renegade Row", sets: 3, reps: "10/side", rest: 90, muscles: "Lats, anti-rotation core", note: "From a push-up position, row alternating sides.", youtube: "renegade row tutorial bodyweight", priority: "med", equipment: ['ninguno'] },
      { id: "inverted_row_pause", name: "Inverted Row with Pause", sets: 4, reps: "10-12", rest: 90, muscles: "Rhomboids, mid traps", note: "2s pause at the top. Key for desk-worker posture.", youtube: "inverted row pause tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "pull_apart", name: "Towel Pull Apart", sets: 3, reps: "15", rest: 60, muscles: "Rear delts", note: "Arms at shoulder height, pull them fully apart.", youtube: "band pull apart posterior deltoid tutorial", priority: "med", equipment: ['toalla'] },
    ]
  },
  p2_mie: {
    phase: 2, day: "mie", title: "Advanced Lower Back",
    exercises: [
      { id: "single_rdl", name: "Single Leg RDL", sets: 3, reps: "10/side", rest: 60, muscles: "Hamstrings, glute, lower back", note: "Perfect hip hinge. Neutral back the whole time.", youtube: "single leg RDL bodyweight tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "glute_bridge_pause", name: "Glute Bridge with Pause (3s)", sets: 4, reps: "15", rest: 60, muscles: "Glutes, hamstrings", note: "3s isometric pause at the top. If it feels easy: go unilateral.", youtube: "glute bridge pause isometric tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "dead_bug_adv", name: "Dead Bug Avanzado", sets: 3, reps: "12/side", rest: 60, muscles: "Core, TVA", note: "Legs fully extended. Harder to keep the lower back pressed down.", youtube: "dead bug advanced tutorial extended legs", priority: "med", equipment: ['ninguno'] },
      { id: "hip_flexor2", name: "Stretching Psoas", sets: 2, reps: "90s/side", rest: 30, muscles: "Psoas, iliacus", note: "Always included. Never skip this one.", youtube: "deep hip flexor stretch psoas", priority: "high", isTimer: true, timerSeconds: 90, equipment: ['ninguno'] },
      { id: "thoracic_ext", name: "Thoracic Extension (towel)", sets: 3, reps: "60s", rest: 30, muscles: "Thoracic spine", note: "Rolled towel at thoracic height. Open your chest toward the ceiling.", youtube: "thoracic extension foam roller towel tutorial", priority: "med", isTimer: true, timerSeconds: 60, equipment: ['toalla'] },
      { id: "worlds_stretch", name: "World's Greatest Stretch", sets: 3, reps: "6/side", rest: 30, muscles: "Full body, posterior chain", note: "The most complete stretch there is.", youtube: "world greatest stretch tutorial", priority: "low", equipment: ['ninguno'] },
    ]
  },
  p2_jue: {
    phase: 2, day: "jue", title: "Advanced Legs",
    exercises: [
      { id: "bulgarian", name: "Bulgarian Split Squat", sets: 4, reps: "10/side", rest: 120, muscles: "Quads, glute, hamstrings", note: "Rear foot on a bench/chair. The most effective leg exercise in calisthenics.", youtube: "bulgarian split squat tutorial form", priority: "high", equipment: ['banco'] },
      { id: "nordic_curl", name: "Nordic Curl (Regression)", sets: 3, reps: "6-8", rest: 120, muscles: "Hamstrings", note: "Anchor your feet under the sofa. Prevents injury and strengthens the posterior chain.", youtube: "nordic curl tutorial hamstrings beginners", priority: "high", equipment: ['ninguno'] },
      { id: "squat_pause", name: "Squat with Pause (3s)", sets: 4, reps: "10", rest: 90, muscles: "Quads, glutes", note: "The pause removes the bounce and builds real strength.", youtube: "pause squat bodyweight tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "step_up", name: "Step-up Explosivo", sets: 3, reps: "10/side", rest: 90, muscles: "Glute, quads", note: "Drive up hard, lower under control. Use a step or a solid chair.", youtube: "explosive step up tutorial plyometric", priority: "med", equipment: ['escalon'] },
      { id: "calf_uni", name: "Calf Raise Unilateral", sets: 3, reps: "15/side", rest: 45, muscles: "Gastrocnemius, soleus", note: "Full range, no bouncing.", youtube: "single leg calf raise tutorial", priority: "low", equipment: ['ninguno'] },
    ]
  },
  p2_vie: {
    phase: 2, day: "vie", title: "Full Body Intensity",
    exercises: [
      { id: "archer2", name: "Archer Push-up", sets: 4, reps: "8/side", rest: 90, muscles: "Unilateral chest", note: "Extend the lead arm a little further each week. Progression toward one-arm.", youtube: "archer push up advanced tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "lsit_full", name: "L-sit Parallel Bars/Chairs", sets: 4, reps: "15-25s", rest: 90, muscles: "Core, hip flexors, shoulders", note: "Straight legs if you can. If not, bend the knees.", youtube: "L-sit on chairs tutorial progression", priority: "high", isTimer: true, timerSeconds: 20, equipment: ['paralelas'] },
      { id: "muscleup_neg", name: "Muscle-up Negativo", sets: 3, reps: "5 (5s)", rest: 120, muscles: "Full pull + push", note: "Step up with a chair, lower very slowly through the transition.", youtube: "muscle up negative tutorial progression", priority: "high", equipment: ['barra_dominadas'] },
      { id: "pistol_prog", name: "Pistol Squat Progression", sets: 3, reps: "8/side", rest: 90, muscles: "Quads, glute, balance", note: "Start by sitting down onto a chair with one leg raised.", youtube: "pistol squat progression tutorial beginners", priority: "med", equipment: ['banco'] },
      { id: "hollow_arch", name: "Hollow-to-Arch Swing", sets: 3, reps: "10", rest: 60, muscles: "Full core, lats, glutes", note: "On the bar, swing between hollow and arch positions under control.", youtube: "hollow arch swing bar calisthenics tutorial", priority: "med", equipment: ['barra_dominadas'] },
    ]
  },
  // ═══════════════════════════════════════ FASE 3 ══════════════════════════════
  p3_lun: {
    phase: 3, day: "lun", title: "Push + Handstand",
    exercises: [
      { id: "handstand_wall", name: "Wall Handstand", sets: 3, reps: "30-60s", rest: 120, muscles: "Shoulders, core, balance", note: "Hands 10-15cm from the wall. Body straight, don't arch your back.", youtube: "handstand against wall tutorial beginner", priority: "high", isTimer: true, timerSeconds: 45, equipment: ['pared'] },
      { id: "pike_hspu", name: "Pike HSPU", sets: 4, reps: "6-10", rest: 120, muscles: "Delts, triceps", note: "Feet on a high chair. Goal: a full handstand push-up.", youtube: "pike handstand push up tutorial", priority: "high", equipment: ['banco'] },
      { id: "one_arm_prog", name: "One-Arm Push-up Progression", sets: 4, reps: "5/side", rest: 120, muscles: "Full unilateral chest", note: "From your knees, or with one hand elevated on a ball.", youtube: "one arm push up progression tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "pseudo_planche", name: "Pseudo Planche Push-up", sets: 3, reps: "6-8", rest: 120, muscles: "Front delts, chest", note: "Fingers pointing toward your feet, body leaning slightly forward.", youtube: "pseudo planche push up tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "planche_lean", name: "Planche Lean", sets: 4, reps: "20-30s", rest: 90, muscles: "Shoulders, wrists, core", note: "Lean forward over your hands. Prepares you for the planche.", youtube: "planche lean tutorial progression", priority: "med", isTimer: true, timerSeconds: 25, equipment: ['ninguno'] },
    ]
  },
  p3_mar: {
    phase: 3, day: "mar", title: "Pull + Skills",
    exercises: [
      { id: "weighted_pullup", name: "Weighted Pull-up (Backpack)", sets: 5, reps: "6-8", rest: 180, muscles: "Lats, biceps", note: "Backpack with 5-10kg. Only if your pull-ups are solid.", youtube: "weighted pull up backpack tutorial", priority: "high", equipment: ['barra_dominadas', 'lastre'] },
      { id: "muscleup_real", name: "Muscle-up", sets: 3, reps: "3-5 (or negatives)", rest: 180, muscles: "Full pull + push", note: "If you're not there yet: 5 very slow negatives.", youtube: "muscle up tutorial step by step", priority: "high", equipment: ['barra_dominadas'] },
      { id: "front_lever_tuck", name: "Front Lever Tucked", sets: 4, reps: "10-20s", rest: 120, muscles: "Lats, core, scapulae", note: "Knees to chest. Body horizontal. Very demanding.", youtube: "front lever tuck tutorial progression", priority: "high", isTimer: true, timerSeconds: 15, equipment: ['barra_dominadas'] },
      { id: "typewriter_pullup", name: "Typewriter Pull-up", sets: 3, reps: "6 total", rest: 120, muscles: "Unilateral lats", note: "Pull up to the centre, slide to one side, then the other, lower.", youtube: "typewriter pull up tutorial advanced", priority: "med", equipment: ['barra_dominadas'] },
    ]
  },
  p3_mie: {
    phase: 3, day: "mie", title: "Lower Back Maintenance",
    exercises: [
      { id: "hip_flexor_deep", name: "Hip Flexor 90/90", sets: 3, reps: "90s/side", rest: 30, muscles: "Psoas, hip capsule", note: "90/90 position on the floor. Deeper than the basic version.", youtube: "90 90 hip flexor stretch tutorial", priority: "high", isTimer: true, timerSeconds: 90, equipment: ['ninguno'] },
      { id: "jefferson_curl", name: "Jefferson Curl (very slow)", sets: 3, reps: "8", rest: 60, muscles: "Spine, hamstrings, lower back", note: "Roll down the spine vertebra by vertebra. VERY slow.", youtube: "jefferson curl tutorial spine mobility", priority: "med", equipment: ['ninguno'] },
      { id: "cossack_squat", name: "Cossack Squat", sets: 3, reps: "8/side", rest: 60, muscles: "Adductors, hip, mobility", note: "Deep lateral squat. Works hip and lower back mobility.", youtube: "cossack squat tutorial mobility", priority: "med", equipment: ['ninguno'] },
      { id: "glute_bridge_march", name: "Glute Bridge March", sets: 3, reps: "12/side", rest: 60, muscles: "Glutes, stabilizer core", note: "From a bridge, lift alternating knees to your chest.", youtube: "glute bridge march tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "thoracic_mobility", name: "Thoracic Mobility Full", sets: 2, reps: "10 min total", rest: 0, muscles: "Full thoracic spine", note: "Rotations, extensions, foam roller. Complete routine.", youtube: "thoracic spine mobility routine programmer", priority: "high", equipment: ['ninguno'] },
    ]
  },
  p3_jue: {
    phase: 3, day: "jue", title: "Legs + Pistol Squat",
    exercises: [
      { id: "pistol_free", name: "Pistol Squat Libre", sets: 4, reps: "5/side", rest: 120, muscles: "Quads, glute, balance", note: "Unsupported. Requires strength, ankle mobility and balance.", youtube: "pistol squat free tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "nordic_adv", name: "Nordic Curl Completo", sets: 3, reps: "5-8", rest: 120, muscles: "Hamstrings", note: "Full range to the floor. Use your hands at the end if needed.", youtube: "nordic hamstring curl full tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "bulgarian_adv", name: "Bulgarian Split + Salto", sets: 3, reps: "8/side", rest: 120, muscles: "Leg power", note: "Jump as you switch legs. High intensity.", youtube: "bulgarian split squat jump plyometric tutorial", priority: "med", equipment: ['banco'] },
      { id: "shrimp_squat", name: "Shrimp Squat Progression", sets: 3, reps: "6/side", rest: 90, muscles: "Quads, balance", note: "Hold your rear foot behind you. Harder than the pistol.", youtube: "shrimp squat tutorial progression", priority: "med", equipment: ['ninguno'] },
    ]
  },
  p3_vie: {
    phase: 3, day: "vie", title: "Skills Day",
    exercises: [
      { id: "lsit_30s", name: "L-sit 30s", sets: 5, reps: "30s", rest: 120, muscles: "Core, hip flexors, shoulders", note: "Phase goal: 30s continuous with straight legs.", youtube: "L-sit 30 seconds tutorial progression", priority: "high", isTimer: true, timerSeconds: 30, equipment: ['paralelas'] },
      { id: "handstand_free", name: "Handstand Libre (intentos)", sets: "múltiples", reps: "attempts 5-15s", rest: 60, muscles: "Balance, shoulders, core", note: "Practise free balancing. Multiple attempts with rest.", youtube: "freestanding handstand tutorial balance", priority: "high", equipment: ['ninguno'] },
      { id: "human_flag_prog", name: "Human Flag Progression", sets: 3, reps: "5-10s", rest: 120, muscles: "Obliques, shoulders, lats", note: "Start tucked. One of the most impressive skills.", youtube: "human flag progression tutorial beginners", priority: "med", isTimer: true, timerSeconds: 8, equipment: ['barra_dominadas'] },
      { id: "front_lever_single", name: "Front Lever Single Leg", sets: 3, reps: "10-15s", rest: 120, muscles: "Lats, core", note: "One leg extended. Progression to the full front lever.", youtube: "front lever single leg tutorial progression", priority: "med", isTimer: true, timerSeconds: 12, equipment: ['barra_dominadas'] },
    ]
  },
  // ═══════════════════════════════════════ FASE 4 ══════════════════════════════
  p4_lun: {
    phase: 4, day: "lun", title: "Peak Push + Handstand",
    exercises: [
      { id: "hspu_wall", name: "Handstand Push-up (wall)", sets: 5, reps: "5-8", rest: 180, muscles: "Delts, triceps, core", note: "Handstand against the wall, lower your head to the floor. Elite.", youtube: "handstand push up wall tutorial", priority: "high", equipment: ['pared'] },
      { id: "one_arm_actual", name: "One-Arm Push-up", sets: 4, reps: "5/side", rest: 120, muscles: "Full unilateral chest", note: "If you can't reach it: archer push-up at maximum lean.", youtube: "one arm push up tutorial full", priority: "high", equipment: ['ninguno'] },
      { id: "planche_tuck", name: "Tuck Planche", sets: 4, reps: "5-15s", rest: 120, muscles: "Front delts, core", note: "Knees to chest, body horizontal. Extremely hard.", youtube: "tuck planche tutorial progression", priority: "high", isTimer: true, timerSeconds: 10, equipment: ['paralelas'] },
      { id: "ring_dip_prog", name: "Ring Dips (or Weighted Dips)", sets: 4, reps: "8-10", rest: 120, muscles: "Triceps, chest, stabilizers", note: "Rings or a backpack. Advanced level.", youtube: "ring dips tutorial beginner progression", priority: "med", equipment: ['anillas'] },
    ]
  },
  p4_mar: {
    phase: 4, day: "mar", title: "Peak Pull + Skills",
    exercises: [
      { id: "front_lever_full", name: "Front Lever Completo", sets: 4, reps: "5-10s", rest: 180, muscles: "Lats, core, scapulae", note: "Body fully horizontal. The most impressive pulling skill.", youtube: "front lever full tutorial", priority: "high", isTimer: true, timerSeconds: 8, equipment: ['barra_dominadas'] },
      { id: "one_arm_pullup_prog", name: "One-Arm Pull-up Progression", sets: 4, reps: "3-5/side", rest: 180, muscles: "Unilateral lats", note: "With a band or from a half grip. A long road, but it starts here.", youtube: "one arm pull up progression tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "muscleup_flow", name: "Muscle-up x5 Flow", sets: 4, reps: "5 in a row", rest: 180, muscles: "Full pull + push", note: "5 in a row without letting go of the bar. Peak pulling.", youtube: "muscle up 5 in a row tutorial", priority: "high", equipment: ['barra_dominadas'] },
      { id: "back_lever", name: "Back Lever Progression", sets: 3, reps: "5-15s", rest: 120, muscles: "Shoulders, chest, core", note: "Start with the tucked back lever.", youtube: "back lever progression tutorial beginners", priority: "med", isTimer: true, timerSeconds: 10, equipment: ['barra_dominadas'] },
    ]
  },
  p4_mie: {
    phase: 4, day: "mie", title: "Elite Lower Back + Mobility",
    exercises: [
      { id: "yoga_flow_lumbar", name: "Lower Back Yoga Flow (15 min)", sets: 1, reps: "15 min", rest: 0, muscles: "Full spine, hips", note: "Yoga routine specific to the lower back. Follow a full video.", youtube: "yoga flow lower back pain relief 15 minutes", priority: "high", equipment: ['ninguno'] },
      { id: "jefferson_adv", name: "Jefferson Curl + Peso", sets: 3, reps: "8 (with 2-5kg)", rest: 60, muscles: "Spine, hamstrings", note: "Now with light weight. Maximum spinal mobility.", youtube: "jefferson curl weighted tutorial", priority: "med", equipment: ['lastre'] },
      { id: "deep_hip_mobility", name: "Hip Mobility Full Routine", sets: 1, reps: "10 min", rest: 0, muscles: "Full hip, lower back", note: "Complete hip mobility routine. Follow a video.", youtube: "hip mobility full routine 10 minutes", priority: "high", equipment: ['ninguno'] },
      { id: "glute_activation_peak", name: "Glute Activation Peak", sets: 4, reps: "20", rest: 45, muscles: "Glutes, hamstrings", note: "X-band walk, clam shell, frog pump. Full activation.", youtube: "glute activation routine complete tutorial", priority: "high", equipment: ['banda_elastica'] },
    ]
  },
  p4_jue: {
    phase: 4, day: "jue", title: "Peak Legs",
    exercises: [
      { id: "pistol_vol", name: "Pistol Squat Volumen", sets: 5, reps: "8/side", rest: 90, muscles: "Quads, glute", note: "5 sets of 8. Maximum leg volume in calisthenics.", youtube: "pistol squat volume training tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "nordic_full", name: "Nordic Curl Full", sets: 4, reps: "8-10", rest: 120, muscles: "Hamstrings", note: "Without using your hands at the end. Maximum eccentric strength.", youtube: "nordic hamstring curl advanced", priority: "high", equipment: ['ninguno'] },
      { id: "shrimp_full", name: "Shrimp Squat Completo", sets: 3, reps: "8/side", rest: 90, muscles: "Quads, ankle, balance", note: "Rear knee touches the floor gently.", youtube: "shrimp squat full tutorial", priority: "med", equipment: ['ninguno'] },
      { id: "box_jump", name: "Box Jump (solid chair)", sets: 4, reps: "8", rest: 90, muscles: "Full-body power", note: "Jump onto a solid chair or step. Land softly.", youtube: "box jump tutorial plyometric form", priority: "med", equipment: ['escalon'] },
    ]
  },
  p4_vie: {
    phase: 4, day: "vie", title: "Skills Peak Day",
    exercises: [
      { id: "skill_complex", name: "Skill Complex (elige 3 skills)", sets: 3, reps: "per skill", rest: 180, muscles: "Variable", note: "Pick your 3 favourite skills and practise. Handstand, L-sit, muscle-up, front lever.", youtube: "calisthenics skills complex advanced", priority: "high", equipment: ['barra_dominadas'] },
      { id: "lsit_45", name: "L-sit 45s Objetivo", sets: 4, reps: "max (target 45s)", rest: 120, muscles: "Core, hip flexors, shoulders", note: "Final goal of the program. 45 continuous seconds.", youtube: "L-sit 45 seconds tutorial", priority: "high", isTimer: true, timerSeconds: 45, equipment: ['paralelas'] },
      { id: "handstand_60", name: "Handstand 60s Libre", sets: "intentos", reps: "target 60s freestanding", rest: 60, muscles: "Full balance", note: "Goal: 60s of freestanding handstand by the end of the 6 months.", youtube: "freestanding handstand 60 seconds tutorial", priority: "high", equipment: ['ninguno'] },
      { id: "strength_test", name: "Monthly Strength Test", sets: 1, reps: "max on all", rest: 300, muscles: "Full body", note: "Last Friday of the month: max pull-ups, max push-ups, L-sit time, max pistol squats. Record and compare.", youtube: "calisthenics strength test benchmark", priority: "high", equipment: ['barra_dominadas'] },
    ]
  },
}

export const getWorkout = (phase: number, day: DayId): Workout | null =>
  WORKOUTS[`p${phase}_${day}`] || null
