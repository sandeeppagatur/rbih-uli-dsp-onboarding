@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String cin;
    private String primaryContactName;
    private String primaryContactEmail;
    private String supportContactName;
    private String supportContactEmail;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ServiceDetail> services;
}
