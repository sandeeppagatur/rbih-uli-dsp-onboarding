@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String postmanCollectionPath;
    private String documentationPath;
    private String status;
    private String prodUrl;
    private String uatUrl;

    @ElementCollection
    private List<String> prodIps;

    @ElementCollection
    private List<String> uatIps;

    private String authType;
    private String clientId;
    private String secretKey; // Ideally encrypted
    private String demoVideoUrl;
}
