export type Category = 
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'education'
  | 'other';

export interface CategoryKeywords {
  [key: string]: string[];
}

export const categoryKeywords: CategoryKeywords = {
  work: [
    'meeting', 'deadline', 'project', 'report', 'email', 'client',
    'work', 'office', 'business', 'presentation', 'team', 'manager',
    'conference', 'call', 'interview', 'review', 'budget', 'plan',
    'strategy', 'proposal', 'contract', 'agreement', 'document',
    'spreadsheet', 'analysis', 'research', 'development', 'code',
    'programming', 'design', 'marketing', 'sales', 'finance',
    'accounting', 'hr', 'recruitment', 'training', 'workshop',
    'seminar', 'webinar', 'conference', 'travel', 'expense',
    'invoice', 'payment', 'salary', 'bonus', 'promotion',
    'performance', 'evaluation', 'feedback', 'collaboration',
    'partnership', 'negotiation', 'deal', 'transaction'
  ],
  personal: [
    'family', 'friend', 'birthday', 'party', 'dinner', 'movie',
    'personal', 'home', 'house', 'clean', 'organize', 'relax',
    'parent', 'child', 'spouse', 'partner', 'sibling', 'relative',
    'pet', 'dog', 'cat', 'hobby', 'craft', 'garden', 'cook',
    'bake', 'read', 'write', 'paint', 'draw', 'music', 'game',
    'travel', 'vacation', 'holiday', 'weekend', 'evening',
    'morning', 'breakfast', 'lunch', 'dinner', 'meal', 'recipe',
    'decorate', 'furniture', 'appliance', 'repair', 'maintenance',
    'laundry', 'dishes', 'grocery', 'errand', 'chore', 'task',
    'event', 'celebration', 'wedding', 'anniversary', 'gift',
    'card', 'letter', 'phone', 'call', 'message', 'chat',
    'social', 'gathering', 'visit', 'host', 'guest', 'entertain',
    'relax', 'rest', 'sleep', 'nap', 'meditate', 'yoga',
    'exercise', 'walk', 'run', 'hike', 'bike', 'swim',
    'sport', 'game', 'play', 'fun', 'enjoy', 'leisure'
  ],
  shopping: [
    'buy', 'purchase', 'grocery', 'store', 'shopping', 'order',
    'delivery', 'amazon', 'market', 'mall', 'cart', 'checkout'
  ],
  health: [
    'doctor', 'appointment', 'exercise', 'gym', 'health', 'medical',
    'diet', 'fitness', 'yoga', 'medication', 'checkup', 'wellness',
    'hospital', 'clinic', 'pharmacy', 'prescription', 'medicine',
    'pill', 'vitamin', 'supplement', 'nutrition', 'food', 'meal',
    'diet', 'weight', 'calorie', 'protein', 'carb', 'fat',
    'sleep', 'rest', 'recovery', 'stress', 'anxiety', 'mental',
    'therapy', 'counseling', 'psychologist', 'psychiatrist',
    'dentist', 'eye', 'vision', 'hearing', 'physical', 'therapy',
    'massage', 'chiropractor', 'acupuncture', 'meditation',
    'mindfulness', 'breathing', 'stretch', 'flexibility',
    'strength', 'cardio', 'aerobic', 'anaerobic', 'run',
    'walk', 'jog', 'swim', 'bike', 'hike', 'sport', 'activity',
    'injury', 'pain', 'ache', 'sore', 'recovery', 'rehab',
    'treatment', 'procedure', 'surgery', 'operation', 'test',
    'scan', 'xray', 'blood', 'urine', 'sample', 'lab', 'result',
    'diagnosis', 'condition', 'disease', 'illness', 'symptom',
    'allergy', 'infection', 'virus', 'bacteria', 'immune',
    'vaccine', 'shot', 'injection', 'prevention', 'care',
    'hygiene', 'clean', 'sanitize', 'disinfect', 'mask',
    'glove', 'protection', 'safety', 'first aid', 'emergency'
  ],
  education: [
    'study', 'learn', 'course', 'class', 'homework', 'assignment',
    'school', 'university', 'reading', 'research', 'exam', 'test'
  ]
}; 