PROMPT_MESSAGE = """
<AD_DETAIL> 

Based on the ad details above, analyze and provide the following:

1. If the Decision Tree Result of the ad is "continue":
   - List the reasons why it should continue.
   - Should we spend more or less on this ad?

2. If the Decision Tree Result of the ad is "stop":
   - List the reasons why it should stop.
   - Suggest possible fixes to improve the ad if it's not working well.

3. Provide any additional insights or suggestions based on the ad data.

4. Most Importantly, be focused on the data like Impressions, CTR, Cost, Clicks, etc. and provide a clear and concise analysis.

Your response should be a valid JSON in the following format:

{
   "ad_id": string,
   "ad_name": string,
   "result": string, // "continue" or "stop"
   "reasons": array of strings, //["reason1", "reason2"]
   "insights": array of strings, //["insight1", "insight2"]
   "suggestions": array of strings, ["suggestion1", "suggestion2"]
}

Ensure the following:
1. Use simple and understandable language in the JSON.
2. Provide only the JSON response, with no additional text.
3. Ensure the JSON format is valid.
"""
