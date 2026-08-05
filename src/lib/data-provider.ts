import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, hasFirebaseConfig } from './firebase';
import { portfolioData } from './data';
import {
  Profile,
  ExperienceItem,
  ProjectItem,
  SkillGroup,
  Education,
  Award,
} from './types';

/**
 * DATA SOURCE SWITCH
 * Set NEXT_PUBLIC_USE_FIREBASE=true in env AND provide valid Firebase
 * config to read from Firestore instead of static data. Every function
 * falls back to static data if Firebase isn't configured or a read fails.
 *
 * Expected Firestore shape:
 *   profile/main       -> Profile
 *   experiences/{id}   -> ExperienceItem  (order by `order` asc)
 *   projects/{id}      -> ProjectItem     (order by `order` asc)
 *   skills/{id}        -> SkillGroup
 *   education/{id}     -> Education
 *   awards/{id}        -> Award
 */
const USE_FIREBASE =
  process.env.NEXT_PUBLIC_USE_FIREBASE === 'true' && hasFirebaseConfig();

export async function getProfile(): Promise<Profile> {
  if (USE_FIREBASE && db) {
    try {
      const snap = await getDoc(doc(db, 'profile', 'main'));
      if (snap.exists()) return snap.data() as Profile;
    } catch (err) {
      console.error('Falling back to static profile:', err);
    }
  }
  return portfolioData.profile;
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  if (USE_FIREBASE && db) {
    try {
      const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceItem));
      }
    } catch (err) {
      console.error('Falling back to static experiences:', err);
    }
  }
  return portfolioData.experiences;
}

export async function getProjects(): Promise<ProjectItem[]> {
  if (USE_FIREBASE && db) {
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectItem));
      }
    } catch (err) {
      console.error('Falling back to static projects:', err);
    }
  }
  return portfolioData.projects;
}

export async function getSkills(): Promise<SkillGroup[]> {
  if (USE_FIREBASE && db) {
    try {
      const snap = await getDocs(collection(db, 'skills'));
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as SkillGroup);
      }
    } catch (err) {
      console.error('Falling back to static skills:', err);
    }
  }
  return portfolioData.skills;
}

export async function getEducation(): Promise<Education[]> {
  if (USE_FIREBASE && db) {
    try {
      const snap = await getDocs(collection(db, 'education'));
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as Education);
      }
    } catch (err) {
      console.error('Falling back to static education:', err);
    }
  }
  return portfolioData.education;
}

export async function getAwards(): Promise<Award[]> {
  if (USE_FIREBASE && db) {
    try {
      const snap = await getDocs(collection(db, 'awards'));
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as Award);
      }
    } catch (err) {
      console.error('Falling back to static awards:', err);
    }
  }
  return portfolioData.awards;
}
