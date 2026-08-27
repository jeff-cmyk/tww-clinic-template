import { defineCollection, z } from 'astro:content';

const clinicCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    tagline: z.string().default('Do Health Differently'),
    phone: z.string(),
    email: z.string().email(),

    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      lat: z.number(),
      lng: z.number(),
    }),

    hours: z.object({
      monday: z.string(),
      tuesday: z.string(),
      wednesday: z.string(),
      thursday: z.string(),
      friday: z.string(),
      saturday: z.string(),
      sunday: z.string(),
    }),

    scheduling: z.object({
      type: z.enum(['neo', 'ghl', 'none']),
      neoUrl: z.string().url().nullish(),
      ghlFormId: z.string().optional(),
      ctaText: z.string().default('Schedule a New Patient Appointment'),
    }),

    hero: z.object({
      headline: z.string(),
      subhead: z.string(),
      ctaText: z.string(),
      image: z.string().optional(),
    }),

    about: z.object({
      headline: z.string(),
      body: z.string(),
      missionStatement: z.string(),
      image: z.string().optional(),
      pageImage: z.string().optional(),
    }),

    team: z.array(z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      photo: z.string().optional(),
    })),

    services: z.array(z.object({
      name: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: z.string().optional(),
    })),

    seo: z.object({
      title: z.string(),
      description: z.string(),
      aboutTitle: z.string().optional(),
      servicesTitle: z.string().optional(),
      contactTitle: z.string().optional(),
    }),

    social: z.object({
      facebook: z.string().url().nullish(),
      instagram: z.string().url().nullish(),
      youtube: z.string().url().nullish(),
    }),

    tracking: z.object({
      ga4: z.string().optional(),
      metaPixel: z.string().optional(),
      customHeadScripts: z.string().optional(),
    }),

    store: z.object({
      enabled: z.boolean().default(false),
      url: z.string().url().nullish(),
    }),

    campaigns: z.array(z.object({
      slug: z.string(),
      headline: z.string(),
      subhead: z.string(),
      offer: z.string().optional(),
      formWebhook: z.string().url().nullish(),
    })).optional(),
  }),
});

export const collections = {
  clinic: clinicCollection,
};
