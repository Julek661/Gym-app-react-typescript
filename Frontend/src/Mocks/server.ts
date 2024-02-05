// import { setupServer } from 'msw/node'
// import { handlers } from './handlers/handlers'
 
// export const server = setupServer(...handlers)



// export const handlers = [
//     graphql.query<any,any>('userExercises', (_req, res, ctx) => {
//         return res(
//             ctx.data({
//                 userExercises: [
//                     {
//                         id: '1',
//                         name: 'Bench Press',
//                         muscletrained: 'Chest',
//                         user_id: '1'
//                     },
//                     {
//                         id: '2',
//                         name: 'Squat',
//                         muscletrained: 'Legs',
//                         user_id: '1'
//                     }
//                 ]
//             })
//         )
//     }
// ]