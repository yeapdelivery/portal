"use client";

import { ContainerPreference } from "../../components/container-preference";
import { HeaderPreference } from "../../components/header-preference";
import { StoreData } from "../../components/store-data";

export function ScreenStore() {
  return (
    <div>
      <section>
        <HeaderPreference
          backgroundImage="/Rectangle.svg"
          name="Insano Burguer"
          profileImage="/Ellipse.svg"
          cancel={() => {}}
          save={() => {}}
        />
      </section>

      <section>
        <form className="flex flex-col md:flex-row">
          <div className="w-full">
            <ContainerPreference
              title="Dados da loja"
              description="Atualize o perfil da sua loja aqui"
            >
              <StoreData cancel={() => {}} save={() => {}} />
            </ContainerPreference>
          </div>
        </form>
      </section>
    </div>
  );
}
