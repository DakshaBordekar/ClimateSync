export interface AIAnalysisReport {
    metadata: {
        overallConfidence: number;
        successfulAgents: number;
        failedAgents: number;
    };
    executiveSummary: {
        overall_assessment: string;
        key_insights: string[];
    };
    priorityActions: Array<{
        action: string;
        description: string;
        urgency: "critical" | "high" | "medium" | "low";
        source: string;
    }>;
    riskAssessment?: {
        overall_risk_level: string;
        critical_risks: number;
        total_risks_identified: number;
        recommendation: string;
    };
    agentAnalyses: Record<string, AgentAnalysis>;
}

export interface AgentAnalysis {
    status: "success" | "failure";
    error?: string;
    data?: {
        confidence: number;
        recommendations?: Array<{
            title: string;
            message: string;
            priority: string;
            details?: string[];
        }>;
        predictions?: Array<{
            title: string;
            message: string;
        }>;
        insights?: Array<{
            title: string;
            message: string;
        }>;
        optimizations?: Array<{
            title: string;
            message: string;
        }>;
        risks?: Array<{
            title: string;
            message: string;
            level: string;
        }>;
    };
}

export interface AIAnalysisResponse {
    success: boolean;
    data: {
        ai_analysis: {
            report: AIAnalysisReport;
            executionTime: number;
        }
    };
    error?: string;
}
