import { tv } from "tailwind-variants";

export interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  currentStep: number;
  activeSteps: number[];
  steps: Step[];
  children: React.ReactNode[];
  updateStep?: (step: number) => void;
  updateSteps?: (step: number) => void;
}

const stepper = tv({
  slots: {
    ball: [
      "w-7 h-7 z-10 bg-gray-600 text-white rounded-full",
      "flex justify-center items-center",
      "font-bold",
    ],
  },

  variants: {
    active: {
      true: {
        ball: "bg-red-default",
      },
    },

    wasDone: {
      true: {
        ball: "bg-green-default",
      },
    },
  },
});

export function Stepper({
  currentStep,
  activeSteps,
  steps,
  children,
  updateStep,
}: StepperProps) {
  const { ball } = stepper();

  function handleUpdateState(step: number) {
    if (updateStep && activeSteps.includes(step)) {
      updateStep(step);
    }
  }

  function handleUpdateSteps(step: number) {
    if (updateStep && !activeSteps.includes(step)) {
      updateStep(step);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-1">
        {steps.map((step, index) => (
          <button
            onClick={() => handleUpdateState(step.id)}
            className="list-none relative flex flex-col items-center w-40"
            key={index}
          >
            {index !== steps.length - 1 && (
              <div className="absolute z-0 border border-gray-700 -right-20 top-[13.5px] left-20"></div>
            )}

            <div
              className={ball({
                active: step.id === currentStep,
                wasDone:
                  activeSteps.includes(step.id) && step.id !== currentStep,
              })}
            >
              {index + 1}
            </div>

            <div className="flex flex-col mb-8">
              <span className="text-sm font-bold text-gray-100 w-20 text-center">
                {step.title}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="w-full">
        {children.map((child, index) => (
          <div
            key={index}
            className={`${
              index + 1 === currentStep ? "block" : "hidden"
            } w-full`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
