import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoal } from "../functions/create-goal";
import { z } from "zod";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";
import { CreateGoalCompletion } from "../functions/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
  "/goals",
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (request) => {
    const { body } = request;

    await createGoal({
      ...body,
    });
  }
);

app.get("/pending-goals", async () => {
  const { pendingGoals } = await getWeekPendingGoals();

  return { pendingGoals };
});

app.post(
  "/completions",
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async (request) => {
    const { goalId } = request.body;

    await CreateGoalCompletion({
      goalId,
    });
  }
);

app.listen({ port: 3333 });
