// change this to true to see test results on the black diamond section.
export const BLACK_DIAMOND = true;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';

const initialState = {
   currentValue: 0,
   futureValues: [],
   previousValues: []
}

export default function counter( state = initialState, action ) {
   switch (action.type) {

      case INCREMENT:
         return {
            currentValue: state.currentValue + action.amount,
            previousValues: [ state.currentValue, ...state.previousValues ],
            futureValues: []
         };

      case DECREMENT:
         return {
            currentValue: state.currentValue - action.amount,
            previousValues: [ state.currentValue, ...state.previousValues ],
            futureValues: []
         };

      case UNDO:
         return {
            currentValue: state.previousValues[0],
            previousValues: state.previousValues.slice( 1 ),
            futureValues: [ state.currentValue, ...state.futureValues ]
         };

         case REDO:
            return {
               currentValue: state.futureValues[0],
               previousValues: [ state.currentValue, ...state.previousValues ],
               futureValues: state.futureValues.slice( 1 )
            };

      default: return state;
   };

}

// action creators
export function increment( amount ) {
   return { amount, type: INCREMENT };
}

export function decrement(amount) {
   return { amount, type: DECREMENT };
}

export function undo() {
   return { type: UNDO }
}

export function redo() {
   return { type: REDO }
}
