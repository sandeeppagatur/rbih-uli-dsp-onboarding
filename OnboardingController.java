@RestController
@RequestMapping("/api/onboarding")
@RequiredArgsConstructor
public class OnboardingController {

    private final ProviderRepository providerRepository;
    private final FileStorageService fileStorageService;

    @PostMapping("/company")
    public ResponseEntity<?> saveCompany(@RequestBody Provider provider) {
        providerRepository.save(provider);
        return ResponseEntity.ok(provider);
    }

    @PostMapping("/compliance")
    public ResponseEntity<?> uploadCompliance(@RequestParam("vaptReport") MultipartFile vapt,
                                              @RequestParam("antimalwareReport") MultipartFile anti) throws IOException {
        String vaptPath = fileStorageService.storeFile(vapt);
        String antiPath = fileStorageService.storeFile(anti);
        return ResponseEntity.ok(Map.of("vaptReport", vaptPath, "antimalwareReport", antiPath));
    }

    @PostMapping("/service")
    public ResponseEntity<?> addService(@RequestParam("providerId") Long providerId,
                                        @RequestParam("name") String name,
                                        @RequestParam("status") String status,
                                        @RequestParam("prodUrl") String prodUrl,
                                        @RequestParam("uatUrl") String uatUrl,
                                        @RequestParam("prodIps") List<String> prodIps,
                                        @RequestParam("uatIps") List<String> uatIps,
                                        @RequestParam("authType") String authType,
                                        @RequestParam("clientId") String clientId,
                                        @RequestParam("secretKey") String secretKey,
                                        @RequestParam(value = "demoVideoUrl", required = false) String demoVideoUrl,
                                        @RequestParam("postmanCollection") MultipartFile postman,
                                        @RequestParam("documentation") MultipartFile documentation) throws IOException {
        Provider provider = providerRepository.findById(providerId).orElseThrow();
        ServiceDetail svc = new ServiceDetail();
        svc.setName(name);
        svc.setStatus(status);
        svc.setProdUrl(prodUrl);
        svc.setUatUrl(uatUrl);
        svc.setProdIps(prodIps);
        svc.setUatIps(uatIps);
        svc.setAuthType(authType);
        svc.setClientId(clientId);
        svc.setSecretKey(secretKey);
        svc.setDemoVideoUrl(demoVideoUrl);
        svc.setPostmanCollectionPath(fileStorageService.storeFile(postman));
        svc.setDocumentationPath(fileStorageService.storeFile(documentation));
        provider.getServices().add(svc);
        providerRepository.save(provider);
        return ResponseEntity.ok(svc);
    }
}
