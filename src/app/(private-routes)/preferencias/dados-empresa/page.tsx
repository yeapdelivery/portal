"use client";

import { Header } from "@/modules/preferences/templates/store-edit/header";

export default function PreferencesCompany() {
  return (
    <Header
      backgroundImage="/Rectangle.svg"
      profileImage="/Ellipse.svg"
      cancel={() => {}}
      save={() => {}}
      name="Insano Burguer"
    />
  );
}
