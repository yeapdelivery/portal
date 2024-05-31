import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface ProductStepperProps {
  children: React.ReactNode[];
  currentStep: number;
  nextStepFunction?: () => void;
  PreviousStepFunction?: () => void;
}

export function ProductStepper({
  children,
  currentStep,
  nextStepFunction,
  PreviousStepFunction,
}: ProductStepperProps) {
  return (
    <div className="flex flex-col justify-between h-full">
      {children.map((chid, index) => {
        return (
          <div
            key={index}
            className={` ${index === currentStep ? "block" : "hidden"}`}
          >
            {chid}
          </div>
        );
      })}
      <div className="fixed bottom-0 right-0 h-20 md:w-96 bg-gray-1000">
        <div className="flex items-center justify-end h-full pr-5 gap-2">
          {currentStep > 0 && (
            <button
              className="w-7 h-7 rounded-lg border border-gray-500 flex items-center justify-center"
              onClick={() => PreviousStepFunction && PreviousStepFunction()}
            >
              <CaretLeft weight="bold" className="text-gray-400" />
            </button>
          )}
          {currentStep !== children.length - 1 && (
            <button
              className="w-7 h-7 rounded-lg border border-gray-500 flex items-center justify-center"
              onClick={() => nextStepFunction && nextStepFunction()}
            >
              <CaretRight weight="bold" className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
