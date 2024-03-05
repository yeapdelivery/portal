"use client";

import { Select } from "@/modules/app/components/select";
import { ContainerPreference } from "../../components/container-preference";
import { HeaderPreference } from "../../components/header-preference";
import { StoreData } from "../../components/store-data";
import SelectField from "@/modules/app/components/select-filed/select-filed";
import { AddressContent } from "@/modules/preferences/components/address-content";
import { Delivey } from "../../components/delivey-preference";

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
        <form>
          <div className="w-full mb-10 space-y-5">
            <ContainerPreference
              title="Dados da loja"
              description="Atualize o perfil da sua loja aqui"
            >
              <StoreData cancel={() => {}} save={() => {}} />
            </ContainerPreference>

            <hr className="border border-gray-700" />

            <ContainerPreference
              title="Informações da Loja"
              description="Atualize as informações da sua loja aqui."
            >
              <AddressContent />
            </ContainerPreference>

            <hr className="border border-gray-700" />

            <ContainerPreference
              title="Delivey da loja"
              description="Atualize as informações da sua loja aqui"
            >
              <Delivey />
            </ContainerPreference>
          </div>
        </form>
      </section>
    </div>
  );
}
