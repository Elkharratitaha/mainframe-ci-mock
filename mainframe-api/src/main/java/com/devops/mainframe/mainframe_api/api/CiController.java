package com.devops.mainframe.mainframe_api.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.UUID;

@RestController
@RequestMapping("/api/ci")
@CrossOrigin(origins = "*") // Autoriser Angular à venir taper sur l'API
public class CiController {

    @PostMapping("/analyze")
    public JobResponse analyzeScript(@RequestBody JobRequest request) {
        String jobId = UUID.randomUUID().toString();
        
        System.out.println("""
            --- NOUVELLE ANALYSE CI ---
            Script : %s
            Contenu : %s
            ID du Job : %s
            ---------------------------
            """.formatted(request.scriptName(), request.codeSnippet(), jobId));
        
        return new JobResponse(jobId, "SUCCESS", "Analyse terminée avec succès.");
    }
}