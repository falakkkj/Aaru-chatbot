import intentsData from '../../intents.json';

interface Intent {
    tag: string;
    patterns: string[];
    responses: string[];
}

const intents = (intentsData as any).intents as Intent[];

export function getChatbotResponse(message: string): string {
    const inputWords = tokenize(message.toLowerCase());

    if (inputWords.length === 0) {
        return "I'm listening. How can I help?";
    }

    let bestMatch: Intent | null = null;
    let highestScore = 0;

    for (const intent of intents) {
        for (const pattern of intent.patterns) {
            const patternWords = tokenize(pattern.toLowerCase());
            const score = calculateMatchScore(inputWords, patternWords);

            if (score > highestScore) {
                highestScore = score;
                bestMatch = intent;
            }
        }
    }

    // Threshold for matching
    if (bestMatch && highestScore > 0.3) {
        const responses = bestMatch.responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Fallback
    const fallbackIntent = intents.find(i => i.tag === 'fallback');
    if (fallbackIntent) {
        const responses = fallbackIntent.responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    return "I'm not sure I understand. Could you rephrase that?";
}

function tokenize(text: string): string[] {
    // Simple regex tokenizer: removes punctuation and splits by whitespace
    return text
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 0);
}

function calculateMatchScore(inputWords: string[], patternWords: string[]): number {
    if (patternWords.length === 0) return 0;

    let matches = 0;
    const uniqueInputWords = new Set(inputWords);

    for (const word of patternWords) {
        if (uniqueInputWords.has(word)) {
            matches++;
        }
    }

    // Normalize score: combination of precision and recall-like matching
    const inputCoverage = matches / inputWords.length;
    const patternCoverage = matches / patternWords.length;

    // Weighted average: pattern coverage is usually more important for intent identification
    return (inputCoverage * 0.4) + (patternCoverage * 0.6);
}
