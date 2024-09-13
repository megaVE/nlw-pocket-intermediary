import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionRoute } from "./routes/create-completion";
import { createGetPendingGoalsRoute } from "./routes/get-pending-goals";
import { createGetWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Routes
app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(createGetPendingGoalsRoute);
app.register(createGetWeekSummaryRoute);

app.listen({ port: 3333 });
