/**
 * Tic-Tac-Toe AI Engine for both 4×4 and 6×6 Grids.
 * Automatically adapts winning lines, positional evaluation,
 * and Alpha-Beta search based on active board size.
 */

export function generateWinningCombinations(size, streak = 4) {
  const combos = [];

  // 1. Horizontal (Rows)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - streak; c++) {
      const line = [];
      for (let k = 0; k < streak; k++) {
        line.push(r * size + (c + k));
      }
      combos.push(line);
    }
  }

  // 2. Vertical (Columns)
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - streak; r++) {
      const line = [];
      for (let k = 0; k < streak; k++) {
        line.push((r + k) * size + c);
      }
      combos.push(line);
    }
  }

  // 3. Diagonal (Down-Right: \)
  for (let r = 0; r <= size - streak; r++) {
    for (let c = 0; c <= size - streak; c++) {
      const line = [];
      for (let k = 0; k < streak; k++) {
        line.push((r + k) * size + (c + k));
      }
      combos.push(line);
    }
  }

  // 4. Anti-Diagonal (Down-Left: /)
  for (let r = 0; r <= size - streak; r++) {
    for (let c = streak - 1; c < size; c++) {
      const line = [];
      for (let k = 0; k < streak; k++) {
        line.push((r + k) * size + (c - k));
      }
      combos.push(line);
    }
  }

  return combos;
}

export const WINNING_COMBOS_4 = generateWinningCombinations(4, 4); // 10 lines
export const WINNING_COMBOS_6 = generateWinningCombinations(6, 4); // 54 lines

export const POSITION_WEIGHTS_4 = [
  4, 2, 2, 4,
  2, 7, 7, 2,
  2, 7, 7, 2,
  4, 2, 2, 4
];

export const POSITION_WEIGHTS_6 = [
  1, 2, 2, 2, 2, 1,
  2, 4, 5, 5, 4, 2,
  2, 5, 8, 8, 5, 2,
  2, 5, 8, 8, 5, 2,
  2, 4, 5, 5, 4, 2,
  1, 2, 2, 2, 2, 1
];

export function getCombosForBoard(board) {
  return board.length === 16 ? WINNING_COMBOS_4 : WINNING_COMBOS_6;
}

export function getWeightsForBoard(board) {
  return board.length === 16 ? POSITION_WEIGHTS_4 : POSITION_WEIGHTS_6;
}

export function checkWinner(board) {
  const combos = getCombosForBoard(board);
  for (const combo of combos) {
    const first = board[combo[0]];
    if (!first) continue;
    let match = true;
    for (let i = 1; i < combo.length; i++) {
      if (board[combo[i]] !== first) {
        match = false;
        break;
      }
    }
    if (match) {
      return { winner: first, line: combo };
    }
  }
  if (board.every(cell => cell !== null)) {
    return { winner: 'TIE', line: null };
  }
  return null;
}

export function getAvailableMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

/**
 * Heuristic static board evaluation
 */
function evaluateBoard(board, aiMark, humanMark) {
  const combos = getCombosForBoard(board);
  const weights = getWeightsForBoard(board);
  let score = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === aiMark) {
      score += weights[i];
    } else if (board[i] === humanMark) {
      score -= weights[i];
    }
  }

  for (const combo of combos) {
    let aiCount = 0;
    let humanCount = 0;

    for (const idx of combo) {
      if (board[idx] === aiMark) aiCount++;
      else if (board[idx] === humanMark) humanCount++;
    }

    if (aiCount > 0 && humanCount > 0) continue;

    if (aiCount === 4) return 10000;
    if (humanCount === 4) return -10000;

    if (aiCount === 3) score += 250;
    else if (aiCount === 2) score += 35;
    else if (aiCount === 1) score += 6;

    if (humanCount === 3) score -= 350;
    else if (humanCount === 2) score -= 45;
    else if (humanCount === 1) score -= 7;
  }

  return score;
}

/**
 * Filter moves to neighborhood of existing marks or golden center
 */
function getCandidateMoves(board) {
  const available = getAvailableMoves(board);
  const size = Math.round(Math.sqrt(board.length));

  if (available.length === board.length) {
    if (size === 4) return [5, 6, 9, 10];
    return [14, 15, 20, 21];
  }

  const occupied = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== null) occupied.push(i);
  }

  const weights = getWeightsForBoard(board);

  const scored = available.map(idx => {
    const r = Math.floor(idx / size);
    const c = idx % size;
    let proximityBonus = 0;

    for (const occ of occupied) {
      const or = Math.floor(occ / size);
      const oc = occ % size;
      const dist = Math.max(Math.abs(r - or), Math.abs(c - oc));
      if (dist === 1) proximityBonus += 15;
      else if (dist === 2) proximityBonus += 4;
    }

    return {
      idx,
      score: proximityBonus + weights[idx]
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const maxCandidates = size === 4 ? 12 : 10;
  return scored.slice(0, maxCandidates).map(item => item.idx);
}

/**
 * Alpha-Beta search
 */
function minimaxAB(board, depth, maxDepth, isMaximizing, alpha, beta, aiMark, humanMark) {
  const winResult = checkWinner(board);
  if (winResult) {
    if (winResult.winner === aiMark) return 10000 - depth * 10;
    if (winResult.winner === humanMark) return depth * 10 - 10000;
    return 0;
  }

  if (depth >= maxDepth) {
    return evaluateBoard(board, aiMark, humanMark);
  }

  const moves = getCandidateMoves(board);
  if (moves.length === 0) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      board[move] = aiMark;
      const evaluation = minimaxAB(board, depth + 1, maxDepth, false, alpha, beta, aiMark, humanMark);
      board[move] = null;

      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      board[move] = humanMark;
      const evaluation = minimaxAB(board, depth + 1, maxDepth, true, alpha, beta, aiMark, humanMark);
      board[move] = null;

      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Compute the next move for AI (supports both 4x4 and 6x6)
 */
export function getAIMove(board, aiMark = 'O', difficulty = 'smart') {
  const humanMark = aiMark === 'O' ? 'X' : 'O';
  const available = getAvailableMoves(board);
  const size = Math.round(Math.sqrt(board.length));

  if (available.length === 0) return null;

  // 1. Immediate Win Check
  for (const move of available) {
    board[move] = aiMark;
    const res = checkWinner(board);
    board[move] = null;
    if (res && res.winner === aiMark) return move;
  }

  // 2. Immediate Block Check
  for (const move of available) {
    board[move] = humanMark;
    const res = checkWinner(board);
    board[move] = null;
    if (res && res.winner === humanMark) {
      if (difficulty === 'smart' || Math.random() < 0.85) {
        return move;
      }
    }
  }

  // Casual Mode
  if (difficulty === 'casual') {
    if (Math.random() < 0.45) {
      let bestScore = -Infinity;
      let chosen = available[0];
      const candidates = getCandidateMoves(board);
      for (const move of candidates) {
        board[move] = aiMark;
        const score = evaluateBoard(board, aiMark, humanMark);
        board[move] = null;
        if (score > bestScore) {
          bestScore = score;
          chosen = move;
        }
      }
      return chosen;
    }
    const candidates = getCandidateMoves(board);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Smart Mode: Opening Center Control
  const centerMoves = size === 4
    ? [5, 6, 9, 10].filter(m => board[m] === null)
    : [14, 15, 20, 21].filter(m => board[m] === null);

  if (available.length >= (board.length - 2) && centerMoves.length > 0) {
    return centerMoves[Math.floor(Math.random() * centerMoves.length)];
  }

  // Dynamic search depth
  const searchDepth = size === 4 ? 3 : 2;
  const candidates = getCandidateMoves(board);

  let bestVal = -Infinity;
  let bestMove = candidates[0];
  let alpha = -Infinity;
  let beta = Infinity;

  for (const move of candidates) {
    board[move] = aiMark;
    const moveVal = minimaxAB(board, 0, searchDepth, false, alpha, beta, aiMark, humanMark);
    board[move] = null;

    if (moveVal > bestVal) {
      bestVal = moveVal;
      bestMove = move;
    }
    alpha = Math.max(alpha, bestVal);
  }

  return bestMove;
}
