export interface ArticleData {
  id: string;
  title: string;
  subtitle?: string;
  databaseId: string;
  lastEdited: string;
  views: number;
  status: "public" | "restricted" | "classified";
  infobox: InfoboxData;
  sections: ArticleSection[];
  relatedArticles: RelatedArticle[];
  references: Reference[];
  categories: string[];
}

export interface InfoboxData {
  image?: string;
  caption?: string;
  fields: InfoboxField[];
}

export interface InfoboxField {
  label: string;
  value: string;
  isLink?: boolean;
  linkHref?: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  subsections?: ArticleSection[];
}

export interface RelatedArticle {
  title: string;
  href: string;
  status?: "public" | "restricted" | "classified";
}

export interface Reference {
  id: number;
  text: string;
  source: string;
  accessDate: string;
}

export interface PopupData {
  id: string;
  type: "ad" | "warning" | "malware" | "subscription";
  title: string;
  content: string;
  image?: string;
}

export interface AdData {
  id: string;
  title: string;
  subtitle: string;
  type: "trauma" | "arasaka" | "militech" | "blackmarket" | "generic";
  clickAction: "popup" | "redirect" | "none";
  popupData?: PopupData;
}
